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
    <div
      className="
        bg-black rounded-3xl 
        w-full 
        max-w-2xl 
        p-6 sm:p-10 
        text-white 
        shadow-xl 
        transform transition-transform duration-300 
        hover:-translate-y-2 hover:scale-[1.02]
      "
    >
      <div className="text-2xl sm:text-3xl font-semibold">Salary</div>

      <div className="mt-6 text-4xl sm:text-5xl font-bold break-words">
        ${displaySalary}
      </div>

      <div className="mt-4 text-base sm:text-lg text-gray-400 break-words leading-relaxed">
        Will be credited to your address:
        <br />
        <span className="text-white font-semibold break-words">{address}</span>
        <br />
        {daysLeft} days left (on {formattedDate})
      </div>
    </div>
  );
};

export default Salary;
