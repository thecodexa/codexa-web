import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET ALL REGISTRATIONS FOR A USER
router.get("/:userId/registrations", async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const result = await pool.query(
      "SELECT contest_id, status FROM contest_registrations WHERE user_id=$1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



//get all contest which a user with user_id is registered to
// router.get("/user/:userId/registrations", async (req, res) => {
//   const userId = Number(req.params.userId);

//   try {
//     const result = await pool.query(
//       "SELECT contest_id, status FROM contest_registrations WHERE user_id = $1",
//       [userId]
//     );

//     res.json(result.rows);
//   } catch (err) {
//     console.error("Registration fetch error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

export default router;
