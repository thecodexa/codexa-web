import { Pool } from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const register = async (req, res) => {
  try {
    const { user_name, first_name, last_name, email, password } = req.body;

    if (!user_name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // hash password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // insert user
    const result = await pool.query(
      `INSERT INTO users (user_name, first_name, last_name, email, password_hash)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING user_id, user_name, email, role, created_at`,
      [user_name, first_name, last_name, email, password_hash]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Email or username already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};