import React from "react";
import { useAccount } from "wagmi";
import { Account } from "../WalletConnectComponents/Account";
import { WalletOptions } from "../WalletConnectComponents/WalletOptions";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

const DashBoard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ConnectWallet />
    </div>
  );
};

export default DashBoard;
