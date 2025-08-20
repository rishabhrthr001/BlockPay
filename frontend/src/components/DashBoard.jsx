import React, { useState, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { Account } from "../WalletConnectComponents/Account";
import YearProgress from "./YearProgress";
import Salary from "./Salary";
import { useAuth } from "../context/context";
import toast from "react-hot-toast";
import axios from "axios";
import RewardsLeft from "./RewardsLeft";

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
            "http://localhost:3000/api/set-address",
            { walletAddress: address },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.success("Wallet address saved");
        } catch (err) {
          toast.error("Failed to save wallet address", err);
        }
      }
    };
    saveWallet();
  }, [isConnected, address, token]);

  if (isConnected) return <Account />;

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="px-4 py-2 rounded-lg bg-black text-white hover:bg-neutral-700 transition"
      >
        Connect Wallet
      </button>
      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-neutral-700 rounded-lg shadow-lg">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
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
      className="min-h-screen text-white p-8"
      style={{ backgroundColor: "#242424" }}
    >
      <div className="flex justify-end mb-8">
        <ConnectWallet />
      </div>

      <div className="mt-10 flex justify-between items-start gap-10 px-32">
        <div className="pl-4 flex-1">
          <YearProgress />
        </div>

        <div className="pr-4 flex-1 flex flex-col items-end gap-6">
          <Salary />
          <RewardsLeft />
        </div>
      </div>
    </div>
  );
}
