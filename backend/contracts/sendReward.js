import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.DEPLOYED_ADDRESS;

// Mint-only ABI
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

router.post("/send-reward", async (req, res) => {
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

    res.send({
      message: `Minted ${amount} tokens to ${userAddress}`,
      txHash: tx.hash,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Transaction failed" });
  }
});

export default router;
