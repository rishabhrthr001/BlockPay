import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import sendRewards from "./contracts/sendReward.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api", walletRoutes);
app.use("/freebies", sendRewards);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("Error", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`the app is running on port ${PORT}`);
});
