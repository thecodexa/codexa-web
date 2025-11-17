import express from "express";
import fs from "fs-extra";
import os from "os";
import path from "path";
import { exec, spawn } from "child_process";
import { v4 as uuid } from "uuid";
import pool from "../db.js";

const router = express.Router();

// ------------------------------------------------
// Helper: Temp dir
// ------------------------------------------------
async function createTempDir() {
  const base = path.join(os.tmpdir(), "codexa_submissions");
  await fs.ensureDir(base);

  const runDir = path.join(base, uuid());
  await fs.ensureDir(runDir);
  return runDir;
}

// ------------------------------------------------
// Helper: Compile C++
// ------------------------------------------------
function compileCpp(runDir) {
  return new Promise((resolve) => {
    const exePath = path.join(runDir, "program");

    const cmd = `g++ "${runDir}/main.cpp" -std=c++17 -O2 -o "${exePath}" 2>&1`;

    exec(cmd, { timeout: 20000 }, (err, stdout) => {
      if (err)
        return resolve({ ok: false, compileError: stdout || err.message });

      resolve({ ok: true, exePath });
    });
  });
}

// ------------------------------------------------
// Helper: Execute program
// ------------------------------------------------
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
      child.kill("SIGKILL");
    }, timeoutMs);

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));

    child.on("exit", () => {
      clearTimeout(timer);

      if (killed) {
        return resolve({ ok: false, error: "TLE" });
      }

      if (stderr.trim()) {
        return resolve({ ok: false, error: stderr.trim() });
      }

      resolve({ ok: true, stdout: stdout });
    });

    child.stdin.write(input);
    child.stdin.end();
  });
}

// ------------------------------------------------
// SUBMIT ROUTE
// ------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const { contestId, problemId, code, userId, language } = req.body;

    // 1️⃣ Fetch contest timing
    const contestRes = await pool.query(
      `SELECT start_time, end_time FROM contests WHERE contest_id = $1`,
      [contestId]
    );

    if (contestRes.rows.length === 0)
      return res.status(404).json({ error: "Contest not found" });

    const { start_time, end_time } = contestRes.rows[0];
    const now = new Date();

    if (now < new Date(start_time))
      return res.status(403).json({ error: "Contest has not started yet" });

    if (now > new Date(end_time))
      return res.status(403).json({ error: "Contest has ended" });


    // Fetch problem details (hidden cases + harness)
    const result = await pool.query(
      `
      SELECT max_score, test_harness, evaluation_cases, time_limit
      FROM problems
      WHERE problem_id = $1
      `,
      [problemId]
    );

    if (result.rows.length === 0)
      return res.json({ success: false, error: "Problem not found" });

    const problem = result.rows[0];

    const maxScore = problem.max_score;
    const harness = problem.test_harness;
    const hiddenCases = problem.evaluation_cases || [];
    const timeLimitMs = (problem.time_limit || 2) * 1000;

    // Prepare combined code
    const runDir = await createTempDir();
    const combinedCode = `
// -------- STUDENT CODE --------
${code}

// -------- TEACHER HARNESS --------
${harness}
`;

    await fs.writeFile(path.join(runDir, "main.cpp"), combinedCode);

    // Compile
    const cmp = await compileCpp(runDir);
    if (!cmp.ok) {
      await fs.remove(runDir);
      return res.json({
        success: false,
        compileError: cmp.compileError,
        results: [],
        score: 0,
      });
    }

    // Run all test cases
    const results = [];
    let passed = 0;

    for (const tc of hiddenCases) {
      const execResult = await runExecutable(
        cmp.exePath,
        tc.input,
        timeLimitMs
      );

      if (!execResult.ok) {
        results.push({
          input: tc.input,
          expected: tc.output,
          error: execResult.error,
        });
        continue;
      }

      const output = execResult.stdout.trim();
      const expected = tc.output.trim();

      const success = output === expected;

      if (success) passed++;

      results.push({
        input: tc.input,
        expected,
        output,
        success,
      });
    }

    const total = hiddenCases.length;
    const score = Math.round((passed / total) * maxScore);

    // Clean up
    await fs.remove(runDir);

    // Save submission
    const submissionInsert = await pool.query(
      `
      INSERT INTO submissions
      (contest_id, problem_id, user_id, code, language, verdict, score, passed, total)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING submission_id
      `,
      [
        contestId,
        problemId,
        userId,
        code,
        language,
        passed === total ? "Accepted" : "Wrong Answer",
        score,
        passed,
        total,
      ]
    );

    const submissionId = submissionInsert.rows[0].submission_id;

    // Update BEST score
    await pool.query(
      `INSERT INTO user_problem_scores (user_id, contest_id, problem_id, best_score, best_submission_id)
VALUES ($1, $2, $3, $4, $5)
ON CONFLICT (user_id, contest_id, problem_id)
DO UPDATE SET 
    best_score = GREATEST(user_problem_scores.best_score, EXCLUDED.best_score),
    best_submission_id = 
        CASE 
            WHEN EXCLUDED.best_score >= user_problem_scores.best_score THEN EXCLUDED.best_submission_id
            ELSE user_problem_scores.best_submission_id
        END;`,
      [userId, contestId, problemId, score , submissionId]
    );

    // Return results
    res.json({
      success: true,
      passed,
      total,
      score,
    });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});


export default router;
