import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/set-salary")}
      className="px-6 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition"
    >
      Set Salaries
    </button>
  );
};

export default AdminDashboard;
