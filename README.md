BlockPay

BlockPay is a Web3-powered payroll system that allows admins to send salaries to employees in crypto. Employees not only get their regular salary but also enjoy yearly bonuses in Golu Coins 🎉.

Built with Solidity, Wagmi, Ethers.js, TailwindCSS, React, and Node.js, BlockPay bridges traditional payroll with decentralized finance.

✨ Features

🔑 Unified Login: Same login system for both Admin and Employee.

💰 Crypto Payroll: Salaries are distributed in crypto directly to employee wallets.

🎁 Yearly Bonus: Every employee receives 1000 Golu Coins as an annual bonus.

💸 Wallet Transfers: Withdraw crypto directly to your wallet.

✅ Withdrawal Verification: One-click "Verify" button to confirm withdrawals.

⚡ Smart Contract Powered: Salary and bonus logic is handled through a Solidity contract.

🛠️ Admin via API: Promote a user to Admin role with a Postman request.

🛠️ Tech Stack

Frontend

React + Vite

TailwindCSS

Wagmi & Ethers.js

Backend

Node.js + Express

MongoDB

JWT for authentication

Smart Contracts

Solidity (Contracts: https://github.com/rishabhrthr001/GoluCoins-web3)

Deployment

Frontend: Vercel

Backend: Render

📂 Project Structure
BlockPay/
├── frontend/ # React + Vite + Wagmi + Tailwind
└── backend/ # Node.js + Express + MongoDB

⚙️ Environment Variables
Backend (.env)
MONGO_URI=<your_mongo_connection_string>
PORT=<server_port>
JWT_SECRET=<your_jwt_secret>
PRIVATE_KEY=<your_wallet_private_key>
RPC_URL=<your_alchemy_or_rpc_url>
DEPLOYED_ADDRESS=<your_deployed_contract_address>

Frontend (.env)
VITE_WALLET_CONNECT_PROJECT_ID=<your_wallet_connect_project_id>
REACT_APP_API_URL=<your_backend_render_url>

🚀 Running Locally
Backend
cd backend
npm install
npm start

The server will start at http://localhost:3000.

Frontend
cd frontend
npm install
npm run dev

The frontend will start at http://localhost:5173 (default Vite port).

🔗 Smart Contract

The GoluCoins contract is available here:
👉 GoluCoins Web3 Repository

🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

📜 License

This project is licensed under the MIT License.
