import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    txHash: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    tokenSymbol: { type: String, default: "GOLU" },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["reward"],
      required: true,
      default: "reward",
    },
    chain: { type: String, default: "Sepolia" },
    fee: { type: Number, default: 0 },
    meta: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["employee", "hr", "admin"],
      default: "employee",
    },
    salary: { type: Number, default: 0 },
    walletAddress: { type: String, default: null },
    rewards: { type: Number, default: 0 },
    transactions: [transactionSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
