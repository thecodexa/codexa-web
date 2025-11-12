import express from "express";
import { applyAsTeacher } from "../controllers/teacherController.js";

const router = express.Router();

// POST /api/apply-teacher
router.post("/apply-teacher", applyAsTeacher);

export default router;
