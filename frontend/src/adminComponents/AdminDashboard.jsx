import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/context";
import { FiEdit } from "react-icons/fi";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;
  const { token } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/employees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEditSalary = (employee) => {
    console.log("Editing salary for:", employee.name);
    const newSalary = prompt(
      `Enter new salary for ${employee.name}:`,
      employee.salary || 0
    );
    if (newSalary !== null) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === employee._id ? { ...emp, salary: Number(newSalary) } : emp
        )
      );

      axios
        .post(
          "http://localhost:3000/admin/set-salary",
          {
            userId: employee._id,
            salary: Number(newSalary),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  return (
    <div className="min-h-screen bg-neutral-700 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="space-y-3">
        {currentEmployees.map((emp) => (
          <div
            key={emp._id}
            className="flex justify-between items-center bg-black/70 hover:bg-black/50 transition rounded-lg p-3 shadow-md w-96"
          >
            <div className="text-lg font-semibold">{emp.name}</div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-medium">${emp.salary || 0}</div>
              <button
                onClick={() => handleEditSalary(emp)}
                className="p-1 rounded hover:bg-black/40 transition"
              >
                <FiEdit size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-black/60 text-gray-300 hover:bg-black/40"
            } transition`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
