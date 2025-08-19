import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("Error", err));

app.get("/", (req, res) => {
  res.status(200).send("Server is running! 🚀");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`the app is running on port ${PORT}`);
});
