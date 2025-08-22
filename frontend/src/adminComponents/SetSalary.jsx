import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/context";
import { FiEdit } from "react-icons/fi";
import BASE_URL from "../utils/apiConfig";

const SetSalary = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editedSalary, setEditedSalary] = useState(0);

  const employeesPerPage = 10;
  const { token } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [token]);

  const handleEditClick = (emp) => {
    setEditingId(emp._id);
    setEditedSalary(emp.salary || 0);
  };

  const handleSaveClick = async (emp) => {
    try {
      await axios.post(
        `${BASE_URL}/admin/set-salary`,
        { userId: emp._id, salary: Number(editedSalary) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEmployees((prev) =>
        prev.map((e) =>
          e._id === emp._id ? { ...e, salary: Number(editedSalary) } : e
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  return (
    <div className="min-h-screen bg-[#242424] text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Set Employee Salaries</h1>

      <div className="space-y-3">
        {currentEmployees.map((emp) => (
          <div
            key={emp._id}
            className="flex justify-between items-center bg-black/70 hover:bg-black/50 transition rounded-lg p-3 shadow-md w-96"
          >
            <div className="text-lg font-semibold">{emp.name}</div>
            <div className="flex items-center gap-2">
              {editingId === emp._id ? (
                <>
                  <input
                    type="number"
                    value={editedSalary}
                    onChange={(e) => setEditedSalary(e.target.value)}
                    className="w-20 text-white bg-gray-800 rounded px-2 border border-gray-600"
                  />
                  <button
                    onClick={() => handleSaveClick(emp)}
                    className="bg-green-600 px-2 rounded hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="bg-red-600 px-2 rounded hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div className="text-lg font-medium">${emp.salary || 0}</div>
                  <button
                    onClick={() => handleEditClick(emp)}
                    className="p-1 rounded hover:bg-black/40 transition"
                  >
                    <FiEdit size={18} />
                  </button>
                </>
              )}
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

export default SetSalary;
