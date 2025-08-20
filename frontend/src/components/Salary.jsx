import React from "react";
import { useAccount } from "wagmi";
import { useAuth } from "../context/context";

const Salary = () => {
  const { address } = useAccount();
  const { salary, joinDate } = useAuth();

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const nextSalaryDate = new Date(currentYear, currentMonth + 1, 1);

  const options = { day: "numeric", month: "short" };
  const formattedDate = nextSalaryDate.toLocaleDateString("en-US", options);

  const timeDiff = nextSalaryDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const calculateProratedSalary = (joinDate, payoutDate, monthlySalary) => {
    if (!joinDate) return monthlySalary;
    const join = new Date(joinDate);

    let year = payoutDate.getFullYear();
    let month = payoutDate.getMonth() - 1;
    let startOfMonth = new Date(year, month, 1);
    let endOfMonth = new Date(year, month + 1, 0);
    let totalDays = endOfMonth.getDate();

    if (join <= startOfMonth) {
      return monthlySalary;
    }

    let daysWorked = (endOfMonth - join) / (1000 * 60 * 60 * 24) + 1;
    return ((daysWorked / totalDays) * monthlySalary).toFixed(2);
  };

  const displaySalary = calculateProratedSalary(
    joinDate,
    nextSalaryDate,
    salary
  );

  return (
    <div className="bg-black rounded-3xl w-[40rem] h-[20rem] p-10 text-white shadow-xl transform transition-transform duration-300 hover:-translate-y-3 hover:scale-105">
      <div className="text-3xl font-semibold">Salary</div>
      <div className="mt-6 text-5xl font-bold">${displaySalary}</div>
      <div className="mt-3 text-lg text-gray-400 break-words">
        Will be credited to your address:
        <br />
        <span className="text-white font-semibold">{address}</span>
        <br />
        {daysLeft} days left (on {formattedDate})
      </div>
    </div>
  );
};

export default Salary;
