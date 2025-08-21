import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import User from "../Users/User.js";

const router = express.Router();

router.post("/set-address", verifyToken, async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { walletAddress },
      { new: true }
    );
    res.json({ success: true, walletAddress: user.walletAddress });
  } catch (err) {
    res.status(500).json({ error: "failed to update the address" });
  }
});

router.get("/get-bonus", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, rewards: user.rewards });
  } catch (err) {
    console.error("Error fetching bonus:", err);
    res.status(500).json({ success: false, message: "Failed to get bonus" });
  }
});

router.post("/withdraw", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });
    if (amount > user.rewards)
      return res.status(400).json({ message: "Insufficient balance" });
    user.rewards -= amount;
    await user.save();
    res
      .status(200)
      .json({ message: "Withdrawal successful", newBalance: user.rewards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/recent-tx", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("transactions");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.transactions.reverse());
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

export default router;
