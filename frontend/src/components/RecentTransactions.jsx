import React, { useEffect, useState } from "react";
import axios from "axios";
import { ExternalLink } from "lucide-react";
import { useAuth } from "../context/context";

const RecentTransactions = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const txPerPage = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/recent-tx", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };
    fetchTransactions();
  }, [token]);

  const indexOfLastTx = currentPage * txPerPage;
  const indexOfFirstTx = indexOfLastTx - txPerPage;
  const currentTxs = transactions.slice(indexOfFirstTx, indexOfLastTx);
  const totalPages = Math.ceil(transactions.length / txPerPage);

  const getStatusColor = (status) => {
    if (status === "success") return "text-green-500";
    if (status === "pending") return "text-yellow-400";
    if (status === "failed") return "text-red-500";
    return "text-white";
  };

  return (
    <div className="min-h-screen p-8 bg-[#242424] text-white">
      <h1 className="text-3xl font-bold mb-6">My Transactions</h1>

      <div className="space-y-4">
        {currentTxs.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No transactions yet
          </div>
        ) : (
          currentTxs.map((tx, index) => (
            <div
              key={index}
              className="bg-black p-4 rounded-xl flex justify-between items-center shadow-md transform transition-transform duration-200 hover:scale-105"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-300">
                  {new Date(tx.createdAt).toLocaleString()}
                </p>
                <p className="font-mono break-all">{tx.txHash}</p>
                <p>
                  {tx.amount} {tx.tokenSymbol}
                </p>
                <p className={getStatusColor(tx.status)}>{tx.status}</p>
              </div>
              <a
                href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-1 transition-colors duration-200"
              >
                Verify <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))
        )}
      </div>

      {transactions.length > txPerPage && (
        <div className="flex justify-end items-center gap-3 mt-6">
          <button
            className="px-3 py-1 bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
