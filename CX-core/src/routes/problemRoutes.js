import express from "express";
import pool from "../db.js"; // PostgreSQL pool connection

const router = express.Router();


//get all problems of a contest by contestId
router.get("/contest/:contestId", async (req, res) => {
  const contestId = Number(req.params.contestId);

  try {
    const result = await pool.query(
      "SELECT * FROM problems WHERE contest_id = $1 ORDER BY problem_id ASC",
      [contestId]
    );

    const cleaned = result.rows.map((problem) => {
      delete problem.evaluation_cases;
      delete problem.full_solution;
      return problem;
    });

    res.json(cleaned);
  } catch (err) {
    console.error("Fetch problems error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
//get a single problem using problemid
router.get("/id/:problemId", async (req, res) => {
  const problemId = Number(req.params.problemId);
  try {
    const result = await pool.query(
      "SELECT * FROM problems WHERE problem_id = $1",
      [problemId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Problem not found" });
    const problem = result.rows[0];
     delete problem.evaluation_cases;
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// -------------------------------
// USER PROBLEM STATUS
// -------------------------------
router.get("/status/:contestId/:problemId/:userId", async (req, res) => {
  try {
    const { contestId, problemId, userId } = req.params;

    const result = await pool.query(
      `
      SELECT passed, total
      FROM submissions
      WHERE contest_id = $1 AND problem_id = $2 AND user_id = $3
      ORDER BY submission_id DESC
      LIMIT 1
      `,
      [contestId, problemId, userId]
    );

    if (result.rows.length === 0)
      return res.json({ status: "not_attempted" });

    const { passed, total } = result.rows[0];

    let status = "not_attempted";

    if (passed === total) status = "accepted";
    else if (passed === 0) status = "wrong";
    else status = "partial";

    res.json({ status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Submission history for a problem
router.get("/history/:contestId/:problemId/:userId", async (req, res) => {
  const { contestId, problemId, userId } = req.params;

  try {
    const q = await pool.query(
      `SELECT submission_id, verdict, score, passed, total,
              language, submitted_at, code
       FROM submissions
       WHERE contest_id = $1 AND problem_id = $2 AND user_id = $3
       ORDER BY submitted_at DESC`,
      [contestId, problemId, userId]
    );

    return res.json(q.rows);
  } catch (err) {
    console.error("History error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});



export default router;