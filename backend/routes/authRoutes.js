import express from "express";
import { verifyToken, authorizeRole } from "../middlewares/auth.js";
import User from "../Users/User.js";

const router = express.Router();

router.get(
  "/employees",
  verifyToken,
  authorizeRole(["admin"]),
  async (req, res) => {
    try {
      const role = "employee";
      const employees = await User.find({ role });

      res.json(employees);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error while fetching employees" });
    }
  }
);

router.post(
  "/set-salary",
  verifyToken,
  authorizeRole(["admin"]),
  async (req, res) => {
    const { userId, salary } = req.body;

    if (!userId || salary == null) {
      return res.status(400).json({ error: "userId and salary are required" });
    }

    if (isNaN(salary)) {
      return res.status(400).json({ error: "Salary must be a number" });
    }

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { salary },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "Salary updated", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
