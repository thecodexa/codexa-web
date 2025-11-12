import  pool  from "../db.js";

export const applyAsTeacher = async (req, res) => {
  try {
    const { instituteCode, userId } = req.body;

    if (!instituteCode || !userId) {
      return res
        .status(400)
        .json({ message: "Institute code and user ID are required" });
    }

    //compare the institute code
    const validCodes = ["JUET123"]; 
    if (!validCodes.includes(instituteCode)) {
      return res.status(400).json({ message: "Invalid institute code" });
    }

    // ✅ Step 2: update user’s role to teacher
    const query = `
      UPDATE users 
      SET role = 'teacher'
      WHERE user_id = $1
      RETURNING user_id, user_name, email, role;
    `;

    const result = await pool.query(query, [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = result.rows[0];
    console.log(`✅ ${updatedUser.user_name} (${updatedUser.email}) is now a teacher.`);

    // ✅ Step 3: send success response
    return res.status(200).json({
      message: "User role updated to teacher successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in applyAsTeacher:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
