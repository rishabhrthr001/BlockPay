import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/context";
import { WithdrawLogic } from "./WithdrawLogic";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

const WithdrawModal = ({ isOpen, onClose, maxTokens, setBonus }) => {
  const { address } = useAccount();
  const { token } = useAuth();
  const [amount, setAmount] = useState("");

  const handleMax = () => setAmount(maxTokens);

  const handleConfirm = async () => {
    const withdrawAmount = Number(amount);

    if (withdrawAmount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    if (withdrawAmount > maxTokens) {
      toast.error("Cannot withdraw more than available EMP coins");
      return;
    }

    try {
      const result = await WithdrawLogic(withdrawAmount, token, address);
      toast.success(`Withdraw successful! Your tx hash is ${result.tx.txHash}`);

      setBonus((prev) => prev - withdrawAmount);

      onClose();
      setAmount("");
    } catch (err) {
      toast.error("Withdraw failed: " + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-black w-2/5 h-1/2 rounded-xl p-6 relative text-white flex flex-col justify-between">
        <button
          className="absolute top-3 right-3 text-white text-xl font-bold transition-transform duration-200 hover:scale-125"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Withdraw EMP Coins
        </h2>

        <div className="flex items-center gap-3 mb-4 justify-center w-full">
          <input
            type="number"
            placeholder="Enter amount"
            className="w-72 px-4 py-2 rounded-xl bg-white text-black text-center"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="px-3 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
            onClick={handleMax}
          >
            Max
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="w-1/2 py-3 rounded-xl bg-white text-black font-semibold text-lg hover:scale-105 transition-transform"
            onClick={handleConfirm}
          >
            Confirm Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

const RewardsLeft = () => {
  const { isConnected } = useAccount();
  const [bonus, setBonus] = useState(0);
  const { token } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const handleWithdrawClick = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first!");
      return;
    }
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchBonus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-bonus",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBonus(response.data.rewards);
      } catch (err) {
        console.error("Failed to get bonus:", err);
      }
    };

    fetchBonus();
  }, [token]);

  return (
    <>
      <div className="bg-black rounded-3xl w-[40rem] h-[20rem] p-10 text-white shadow-xl transform transition-transform duration-300 hover:-translate-y-3 hover:scale-105">
        <div className="text-3xl font-semibold">GOLU Coins Bonus</div>
        <div className="mt-6 text-5xl font-bold">{bonus} G's</div>
        <div className="mt-8 flex justify-end">
          <button
            className="px-5 py-3 rounded-xl bg-white text-black font-semibold text-lg transition-transform duration-200 hover:scale-110 shadow-md"
            onClick={handleWithdrawClick}
          >
            Withdraw 🎁
          </button>
        </div>
      </div>

      <WithdrawModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        maxTokens={bonus}
        setBonus={setBonus}
      />
    </>
  );
};

export default RewardsLeft;
