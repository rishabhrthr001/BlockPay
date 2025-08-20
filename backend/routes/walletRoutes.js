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

export default router;
