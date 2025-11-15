import express from "express";
import pool from "../db.js"; // PostgreSQL pool connection

const router = express.Router();

//get all contest which a user with user_id is registered to
router.get("/user/:userId/registrations", async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const result = await pool.query(
      "SELECT contest_id, status FROM contest_registrations WHERE user_id = $1",
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Registration fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


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
          (contest_id, title, description, difficulty, max_score, input_format, 
           output_format, starter_code, full_solution, test_harness, test_cases)
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
      `;

      for (const q of questions) {
        await client.query(insertQuestionQuery, [
          contest_id,
          q.title,
          q.description,
          q.difficulty,
          q.max_score,
          q.input_format,
          q.output_format,
          q.starter_code,
          q.full_solution,
          q.test_harness,
          JSON.stringify(q.test_cases),
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


const row = contestResult.rows[0];
const contest = {...row,
      created_by: {
        user_id: row.created_by,
        first_name: row.first_name,
        last_name: row.last_name,
      },};
      delete contest.first_name;
      delete contest.last_name;
    if (!contest)
      return res.status(404).json({ error: "Contest not found" });

    const questions = await pool.query(
      "SELECT problem_id, title, difficulty, max_score FROM problems WHERE contest_id = $1",
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





export default router;
