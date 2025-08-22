import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../utils/apiConfig";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Signup failed", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#121212] text-white relative">
      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-white border-b-white border-l-gray-400 border-r-gray-400 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-full max-w-md bg-[#1E1E1E] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg bg-[#242424] text-white outline-none focus:ring-2 focus:ring-neutral-700"
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-[#242424] text-white outline-none focus:ring-2 focus:ring-neutral-700"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-[#242424] text-white outline-none focus:ring-2 focus:ring-neutral-700"
            disabled={loading}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-black hover:bg-neutral-700 transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
