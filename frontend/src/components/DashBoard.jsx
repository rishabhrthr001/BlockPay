import React, { useState, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { Account } from "../WalletConnectComponents/Account";
import YearProgress from "./YearProgress";
import Salary from "./Salary";
import { useAuth } from "../context/context";
import toast from "react-hot-toast";
import axios from "axios";
import RewardsLeft from "./RewardsLeft";
import BASE_URL from "../utils/apiConfig";

function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const [showOptions, setShowOptions] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const saveWallet = async () => {
      if (isConnected && address) {
        try {
          await axios.post(
            `${BASE_URL}/api/set-address`,
            { walletAddress: address },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.success("Wallet address saved");
        } catch (err) {
          toast.error("Failed to save wallet address");
        }
      }
    };
    saveWallet();
  }, [isConnected, address, token]);

  if (isConnected) return <Account />;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <button className="px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-700 transition">
        Connect Wallet
      </button>

      {showOptions && (
        <div className="absolute right-0 mt-2 w-40 bg-black border border-neutral-700 rounded-lg shadow-lg z-20">
          {connectors.map((connector) => (
            <button
              key={connector.id || connector.name}
              onClick={() => connect({ connector })}
              className="w-full text-left px-4 py-2 text-white hover:bg-neutral-700 transition"
            >
              {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DashBoard() {
  return (
    <div
      className="min-h-screen text-white p-6 sm:p-8"
      style={{ backgroundColor: "#242424" }}
    >
      {/* Connect Wallet Button */}
      <div className="flex justify-end mb-8">
        <ConnectWallet />
      </div>

      {/* Responsive Layout */}
      <div
        className="
          mt-10 
          flex flex-col lg:flex-row 
          justify-between 
          items-start 
          gap-10 
          w-full
        "
      >
        {/* LEFT SIDE */}
        <div className="flex-1 w-full">
          <YearProgress />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 w-full flex flex-col gap-6 lg:items-end">
          <Salary />
          <RewardsLeft />
        </div>
      </div>
    </div>
  );
}
