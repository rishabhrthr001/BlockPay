import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/context";
import { WithdrawLogic } from "./WithdrawLogic";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/apiConfig";

const WithdrawModal = ({ isOpen, onClose, maxTokens, setBonus }) => {
  const { address } = useAccount();
  const { token } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMax = () => setAmount(maxTokens);

  const handleConfirm = async () => {
    const withdrawAmount = Number(amount);

    if (withdrawAmount <= 0)
      return toast.error("Amount must be greater than 0");

    if (withdrawAmount > maxTokens)
      return toast.error("Cannot withdraw more than available Golu coins");

    try {
      setLoading(true);
      await WithdrawLogic(withdrawAmount, token, address);
      toast.success("Withdraw successful!");
      setBonus((prev) => prev - withdrawAmount);
      onClose();
      setAmount("");
    } catch (err) {
      toast.error("Withdraw failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
      <div className="bg-black w-full max-w-md rounded-xl p-6 relative text-white">
        {loading && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl z-50">
            <div className="w-16 h-16 border-4 border-t-white border-b-white border-l-gray-400 border-r-gray-400 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white text-xl font-bold transition-transform duration-200 hover:scale-125"
          onClick={onClose}
          disabled={loading}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Withdraw Golu Coins
        </h2>

        {/* Input Section */}
        <div className="flex items-center gap-3 justify-center w-full mb-6 flex-col sm:flex-row">
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full sm:w-56 px-4 py-2 rounded-xl bg-white text-black text-center"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
          <button
            className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition w-full sm:w-auto"
            onClick={handleMax}
            disabled={loading}
          >
            Max
          </button>
        </div>

        {/* Confirm Button */}
        <button
          className="w-full py-3 rounded-xl bg-white text-black font-semibold text-lg hover:scale-105 transition-transform"
          onClick={handleConfirm}
          disabled={loading}
        >
          Confirm Withdraw
        </button>
      </div>
    </div>
  );
};

const RewardsLeft = () => {
  const { isConnected } = useAccount();
  const [bonus, setBonus] = useState(0);
  const { token } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleWithdrawClick = () => {
    if (!isConnected) return toast.error("Please connect your wallet first!");
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchBonus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/get-bonus`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBonus(response.data.rewards);
      } catch (err) {
        console.error("Failed to get bonus:", err);
      }
    };

    fetchBonus();
  }, [token]);

  return (
    <>
      <div
        className="
          bg-black rounded-3xl 
          w-full max-w-2xl 
          p-6 sm:p-10 text-white 
          shadow-xl 
          transform transition-transform duration-300 
          hover:-translate-y-2 hover:scale-[1.02]
        "
      >
        <div className="text-2xl sm:text-3xl font-semibold">
          GOLU Coins Bonus
        </div>

        <div className="mt-6 text-4xl sm:text-5xl font-bold break-words">
          {bonus} G's
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            className="w-full px-5 py-3 rounded-xl bg-neutral-800 text-white font-semibold text-lg hover:scale-110 transition shadow-md"
            onClick={() => navigate("/show-tx")}
          >
            Recent Transactions 📜
          </button>

          <button
            className="w-full px-5 py-3 rounded-xl bg-white text-black font-semibold text-lg hover:scale-110 transition shadow-md"
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
