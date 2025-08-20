import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName || undefined });

  return (
    <div className="flex flex-col items-start gap-2">
      {ensAvatar && (
        <img
          alt="ENS Avatar"
          src={ensAvatar}
          className="w-10 h-10 rounded-full"
        />
      )}
      {/* {address && (
        <div className="text-white">
          {ensName ? `${ensName} (${address})` : address}
        </div>
      )} */}
      <button
        onClick={() => disconnect()}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-700"
      >
        Disconnect
      </button>
    </div>
  );
}
