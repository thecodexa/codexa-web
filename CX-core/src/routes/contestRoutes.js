import express from "express";
import pool from "../db.js"; // PostgreSQL pool connection

const router = express.Router();


//create a contest with questions
router.post("/create", async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      title,
      description,
      rules,
      start_time,
      end_time,
      created_by,
      total_marks,
      questions,
    } = req.body;

    if (!title || !start_time || !end_time || !created_by) {
      return res
        .status(400)
        .json({ error: "Missing required contest fields." });
    }

    await client.query("BEGIN");

    // 1️⃣ Insert contest
    const contestQuery = `
      INSERT INTO contests 
        (title, description, start_time, end_time, rules, created_by, total_marks)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING contest_id;
    `;
    const result = await client.query(contestQuery, [
      title,
      description,
      start_time,
      end_time,
      rules,
      created_by,
      total_marks,
    ]);

    const contest_id = result.rows[0].contest_id;

    // 2️⃣ Insert each question into problems
    if (Array.isArray(questions) && questions.length > 0) {
      const insertQuestionQuery = `
        INSERT INTO problems 
          (contest_id, title, description, difficulty, max_score, starter_code, full_solution, test_harness, test_cases, evaluation_cases)
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
      `;

      for (const q of questions) {
        await client.query(insertQuestionQuery, [
          contest_id,
          q.title,
          q.description,
          q.difficulty,
          q.max_score,
          q.starter_code,
          q.full_solution,
          q.test_harness,
          JSON.stringify(q.test_cases),
          JSON.stringify(q.evaluation_cases),
        ]);
      }
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Contest and questions created successfully.",
      contest_id,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error creating contest:", err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
});

//get list of all contests
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contests ORDER BY start_time ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch contests" });
  }
});

//check weather a user is registered for a contest or not
router.get("/:id/is-registered/:userId", async (req, res) => {
  const contestId = Number(req.params.id);
  const userId = Number(req.params.userId);

  try {
    const result = await pool.query(
      `SELECT status 
       FROM contest_registrations
       WHERE user_id = $1 AND contest_id = $2`,
      [userId, contestId]
    );

    if (result.rows.length > 0) {
      res.json({
        registered: true,
        status: result.rows[0].status,
      });
    } else {
      res.json({ registered: false });
    }
  } catch (err) {
    console.error("Check registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//get contest details by contestId
router.get("/:id", async (req, res) => {
  const contestId = parseInt(req.params.id);

  if (isNaN(contestId)) {
    return res.status(400).json({ error: "Invalid contest ID" });
  }


  try {
    const contestResult = await pool.query(
  `SELECT c.*, u.first_name, u.last_name 
   FROM contests c
   JOIN users u ON c.created_by = u.user_id
   WHERE c.contest_id = $1`,
  [contestId]
);

if (contestResult.rows.length === 0) {
  return res.status(404).json({ error: "Contest not found" });
}
const row = contestResult.rows[0];
const contest = {...row,
      created_by: {
        user_id: row.created_by,
        first_name: row.first_name,
        last_name: row.last_name,
      },};
      delete contest.first_name;
      delete contest.last_name;


    const questions = await pool.query(
      "SELECT problem_id, title, difficulty, max_score FROM problems WHERE contest_id = $1 ORDER BY problem_id ASC",
      [contestId]
    );

    contest.questions = questions.rows;

    res.json(contest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


//register for a contest with contestId with user_id
router.post("/:id/register", async (req, res) => {
  const contestId = Number(req.params.id);
  const { user_id } = req.body;

  if (!user_id || isNaN(contestId)) {
    return res.status(400).json({ error: "Invalid user_id or contest_id" });
  }

  try {
    const query = `
      INSERT INTO contest_registrations (user_id, contest_id, status)
      VALUES ($1, $2, 'registered')
      ON CONFLICT (user_id, contest_id) DO NOTHING
      RETURNING id, registered_at;
    `;

      const result = await pool.query(query, [user_id, contestId]);

    if (result.rows.length > 0) {
      // newly inserted
      return res.status(201).json({
        registered: true,
        already_registered: false,
        registered_at: result.rows[0].registered_at,
      });
    } else {
      // conflict -> already registered
      return res.status(200).json({
        registered: true,
        already_registered: true,
      });
    }
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get contest summary
router.get("/:contestId/summary", async (req, res) => {
  const contestId = Number(req.params.contestId);

  try {
    // contest base info
    const contestQ = await pool.query(
      `SELECT contest_id, title, description, start_time, end_time, total_marks
       FROM contests
       WHERE contest_id = $1`,
      [contestId]
    );

    if (contestQ.rows.length === 0)
      return res.status(404).json({ error: "Contest not found" });

    // problems total + max score
    const problemsQ = await pool.query(
      `SELECT COUNT(*) AS total_problems,
              COALESCE(SUM(max_score), 0) AS max_score
       FROM problems
       WHERE contest_id = $1`,
      [contestId]
    );

    const contest = contestQ.rows[0];
    const { total_problems, max_score } = problemsQ.rows[0];

    return res.json({
      ...contest,
      total_problems: Number(total_problems),
      max_score: Number(max_score),
    });
  } catch (err) {
    console.error("Summary route error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Leaderboard for a contest
router.get("/:contestId/leaderboard", async (req, res) => {
  const contestId = Number(req.params.contestId);

  try {
    const lb = await pool.query(
      `SELECT
         u.user_id,
         COALESCE(u.user_name, CONCAT(u.first_name, ' ', u.last_name)) AS username,
         COALESCE(SUM(ups.best_score), 0) AS total_score,
         COALESCE(MAX(ups.last_updated), to_timestamp(0)) AS last_activity
       FROM users u
       JOIN user_problem_scores ups
         ON u.user_id = ups.user_id AND ups.contest_id = $1
       GROUP BY u.user_id, username
       ORDER BY total_score DESC, last_activity ASC`,
      [contestId]
    );

    const rows = lb.rows.map((r, i) => ({
      rank: i + 1,
      user_id: r.user_id,
      username: r.username,
      total_score: Number(r.total_score),
      last_activity: r.last_activity,
    }));

    return res.json(rows);
  } catch (err) {
    console.error("Leaderboard error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get detailed user performance in a contest
router.get("/:contestId/user/:userId", async (req, res) => {
  const contestId = Number(req.params.contestId);
  const userId = Number(req.params.userId);

  try {
    const totalsQ = await pool.query(
      `SELECT u.user_id,
              COALESCE(SUM(ups.best_score), 0) AS total_score,
              COALESCE(MAX(ups.last_updated), to_timestamp(0)) AS last_activity
       FROM users u
       JOIN user_problem_scores ups
         ON ups.user_id = u.user_id AND ups.contest_id = $1
       GROUP BY u.user_id`,
      [contestId]
    );

    const totals = totalsQ.rows.map((r) => ({
      user_id: r.user_id,
      total_score: Number(r.total_score),
      last_activity: r.last_activity,
    }));

    const userRow = totals.find((t) => t.user_id === userId) || {
      total_score: 0,
      last_activity: null,
    };

    const rank =
      totals.filter((t) => {
        if (t.total_score > userRow.total_score) return true;
        if (t.total_score < userRow.total_score) return false;
        return t.last_activity < userRow.last_activity;
      }).length + 1;

    const details = await pool.query(
      `SELECT 
         p.problem_id,
         p.title,
         p.max_score,
         COALESCE(ups.best_score, 0) AS best_score,
         COALESCE(ups.last_updated, NULL) AS last_updated,
         COALESCE(s.attempts, 0) AS attempts
       FROM problems p
       LEFT JOIN user_problem_scores ups
         ON ups.problem_id = p.problem_id
        AND ups.user_id = $2
        AND ups.contest_id = $1
       LEFT JOIN (
         SELECT problem_id, COUNT(*) AS attempts
         FROM submissions
         WHERE contest_id = $1 AND user_id = $2
         GROUP BY problem_id
       ) s ON s.problem_id = p.problem_id
       WHERE p.contest_id = $1
       ORDER BY p.problem_id`,
      [contestId, userId]
    );

    return res.json({
      user_id: userId,
      total_score: userRow.total_score,
      rank,
      problems: details.rows.map((r) => ({
        problem_id: r.problem_id,
        title: r.title,
        max_score: Number(r.max_score),
        best_score: Number(r.best_score),
        attempts: Number(r.attempts),
        last_updated: r.last_updated,
      })),
    });
  } catch (err) {
    console.error("User detail error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});






export default router;
