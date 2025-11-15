import React from "react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0c0c0c] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[150px] top-20 left-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-orange-600/20 rounded-full blur-[150px] bottom-20 right-20"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        {/* PERFECT 3D BTC-LIKE ROTATING G COIN */}
        <div className="flex justify-center mb-12">
          <div className="coin-container">
            <div className="coin">
              {/* FRONT FACE */}
              <div className="coin-face coin-front">G</div>
              {/* BACK FACE */}
              <div className="coin-face coin-back">G</div>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tight">
          Decentralized Payroll
          <br />
          Powered by{" "}
          <span className="text-yellow-400 drop-shadow-lg">Golu Coins</span>
        </h1>

        <p className="text-gray-300 mt-6 text-lg md:text-xl">
          On-chain payroll automation, real-time bonus rewards, and borderless
          payments — all using
          <span className="text-yellow-400 font-semibold">
            {" "}
            Golu Coin (ERC-20)
          </span>
          .
        </p>
      </div>

      {/* Inline CSS */}
      <style>{`
        .coin-container {
          perspective: 1200px;
        }

        .coin {
          position: relative;
          width: 160px;
          height: 160px;
          transform-style: preserve-3d;
          animation: spin 3s linear infinite;
        }

        .coin-face {
          position: absolute;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #ffdd55, #d4a017, #b8860b, #7a5a00);
          border: 6px solid #f0c93b;
          box-shadow: 
            inset 0 0 20px #00000070,
            0 0 40px rgba(255, 215, 0, 0.6);
          
          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 72px;
          font-weight: 900;
          color: #3a2a00;
          text-shadow: 0 0 10px rgba(0,0,0,0.8);
        }

        .coin-front {
          transform: translateZ(10px);
        }

        .coin-back {
          transform: rotateY(180deg) translateZ(10px);
        }

        /* 3D thickness imitation */
        .coin::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(
            to right,
            #a67c00,
            #c79d00,
            #e6b800,
            #c79d00,
            #a67c00
          );
          transform: translateZ(-10px);
        }

        @keyframes spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
