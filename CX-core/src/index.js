import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import teacherRoutes from "./routes/teacherRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/teach", teacherRoutes);

app.get("/", (req, res) => res.send("Codexa backend running ✅"));

app.listen(PORT, "::", () => {
  console.log(`Server running on all interfaces at port ${PORT}`);
});