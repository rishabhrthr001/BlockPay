import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/context.jsx";
import BASE_URL from "../utils/apiConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });
      toast.success("Login Successful:", response.data);
      const userName = response.data.user?.name;
      const role = response.data.user?.role;
      const token = response.data.token;
      const salary = response.data.user?.salary;
      const joinDate = response.data.user?.joinDate;
      login(userName, role, token, salary, joinDate);
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
      return token;
    } catch (err) {
      toast.error("login failed", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#121212] text-white">
      <div className="w-full max-w-md bg-[#1E1E1E] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to BlockPay
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-[#242424] text-white outline-none focus:ring-2 focus:ring-neutral-600"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-[#242424] text-white outline-none focus:ring-2 focus:ring-neutral-600"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-black hover:bg-neutral-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
