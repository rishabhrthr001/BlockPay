import express from "express";
import { verifyToken, authorizeRole } from "../middlewares/auth.js";
import User from "../Users/User.js";

const router = express.Router();

router.post(
  "/set-salary",
  verifyToken,
  authorizeRole(["admin"]),
  async (req, res) => {
    const { userId, salary } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { salary },
        { new: true }
      );
      res.json({ message: "Salary updated", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
