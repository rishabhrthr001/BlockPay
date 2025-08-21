import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
import { verifyToken } from "../middlewares/auth.js";
import User from "../Users/User.js";

dotenv.config();

const router = express.Router();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.DEPLOYED_ADDRESS;

const abi = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

router.post("/send-reward", verifyToken, async (req, res) => {
  try {
    const { userAddress, amount } = req.body;

    if (!userAddress || !amount) {
      return res.status(400).send({ error: "Missing address or amount" });
    }

    const tx = await contract.mint(
      userAddress,
      ethers.parseUnits(amount.toString(), 18)
    );
    await tx.wait();

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.transactions.push({
      txHash: tx.hash,
      from: wallet.address,
      to: userAddress,
      amount: Number(amount),
      tokenSymbol: "GOLU",
      status: "success",
      type: "reward",
      chain: "Sepolia",
      fee: 0,
      meta: { note: "Reward minted by admin" },
      createdAt: new Date(),
    });

    await user.save();

    res.send({
      message: `Minted ${amount} tokens to ${userAddress}`,
      txHash: tx.hash,
    });
  } catch (err) {
    console.error("Send reward error:", err);
    res.status(500).send({ error: "Transaction failed", details: err.message });
  }
});

export default router;
