import express from "express";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { exec, spawn } from "child_process";
import { v4 as uuidv4 } from "uuid";
import pool from "../db.js";

const router = express.Router();

// Helpers -------------------------------------------------

async function createTempDir() {
  const base = path.join(os.tmpdir(), "codexa_runs");
  await fs.ensureDir(base);

  const dir = path.join(base, uuidv4());
  await fs.ensureDir(dir);

  return dir;
}

function compileCpp(runDir) {
  return new Promise((resolve) => {
    const exePath = path.join(runDir, "run_exec");

    const cmd = `g++ "${runDir}/run.cpp" -std=c++17 -O2 -o "${exePath}" 2>&1`;

    exec(cmd, { timeout: 15000 }, (err, stdout) => {
      if (err) {
        return resolve({
          ok: false,
          compileError: stdout || err.message,
        });
      }
      resolve({ ok: true, exePath });
    });
  });
}

function runExecutable(exePath, input, timeoutMs) {
  return new Promise((resolve) => {
    const child = spawn(exePath, [], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    let killed = false;

    const timer = setTimeout(() => {
      killed = true;
      try {
        child.kill("SIGKILL");
      } catch (e) {}
    }, timeoutMs);

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));

    child.on("exit", () => {
      clearTimeout(timer);

      if (killed) {
        return resolve({ ok: false, error: "Time Limit Exceeded (TLE)" });
      }

      if (stderr.trim()) {
        return resolve({ ok: false, error: stderr.trim() });
      }

      resolve({ ok: true, stdout });
    });

    child.stdin.write(input);
    child.stdin.end();
  });
}

// Route ---------------------------------------------------

router.post("/", async (req, res) => {
  try {
    const { code, problemId } = req.body;

    if (!code || !problemId) {
      return res.status(400).json({ error: "Missing code or problemId" });
    }

    // Fetch the problem from DB
    const result = await pool.query(
      `
      SELECT test_harness, test_cases, time_limit
      FROM problems
      WHERE problem_id = $1
      `,
      [problemId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const problem = result.rows[0];
    const harness = problem.test_harness;
    const testcases = problem.test_cases || [];  // ⭐ FIXED

    const timeLimitMs = (problem.time_limit || 2) * 1000;

    // Create temp dir
    const runDir = await createTempDir();

    // Combine student code + harness
    const runSource = `
// ----- STUDENT CODE -----
${code}

// ----- TEACHER HARNESS -----
${harness}
`;

    await fs.writeFile(path.join(runDir, "run.cpp"), runSource);

    // Compile
    const cmp = await compileCpp(runDir);
    if (!cmp.ok) {
      await fs.remove(runDir);
      return res.json({ success: false, compileError: cmp.compileError });
    }

    // ⭐ Run all testcases one by one
    const results = [];

    for (const tc of testcases) {
      const input = tc.input || "";

      const execResult = await runExecutable(
        cmp.exePath,
        input,
        timeLimitMs
      );

      if (!execResult.ok) {
        results.push({
          input,
          expected: tc.output,
          error: execResult.error,
        });
        continue;
      }

      results.push({
        input,
        expected: tc.output,
        output: execResult.stdout,
      });
    }

    // Cleanup
    await fs.remove(runDir);

    return res.json({
      success: true,
      results,
    });

  } catch (err) {
    console.error("RUN ERROR:", err);
    return res.status(500).json({ error: err.toString() });
  }
});

export default router;
