import React, { useState, useEffect } from "react";
import { useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}

function WalletOption({ connector, onClick }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      className="bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-700"
      disabled={!ready}
      onClick={onClick}
    >
      {connector.name}
    </button>
  );
}
