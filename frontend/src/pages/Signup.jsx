import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post("http://localhost:3000/auth/signup", {
        name: name,
        email: email,
        password: password,
      });
      toast.success("signup successful", response.data);
      navigate("/login");
    } catch (err) {
      toast.error("signup failed", err.response);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#121212] text-white">
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
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-[#242424] text-white outline-none focus:ring-2 focus:ring-neutral-700"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-[#242424] text-white outline-none focus:ring-2 focus:ring-neutral-700"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-black hover:bg-neutral-700 transition"
          >
            Signup
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
