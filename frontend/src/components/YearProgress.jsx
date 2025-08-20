import React from "react";
import { useAuth } from "../context/context";

const YearProgress = () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const progress = ((today - startOfYear) / (endOfYear - startOfYear)) * 100;

  const { joinDate } = useAuth();
  const join = joinDate ? new Date(joinDate) : null;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const reversedMonths = [...months].reverse();

  return (
    <div className="w-full max-w-5xl mx-auto p-6 flex">
      <div className="flex flex-col justify-between mr-6">
        {reversedMonths.map((month) => (
          <span key={month} className="text-sm font-medium text-white/80">
            {month}
          </span>
        ))}
      </div>

      <div className="relative w-4 h-[600px] rounded-full bg-black">
        <div
          className="absolute bottom-0 left-0 w-4 rounded-full bg-white/90 transition-all"
          style={{ height: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col justify-between ml-6">
        {reversedMonths.map((month, i) => {
          const monthIndex = 11 - i;
          const year = today.getFullYear();
          const monthStart = new Date(year, monthIndex, 1);
          const monthEnd = new Date(year, monthIndex + 1, 0);
          const totalDays = monthEnd.getDate();

          let bonusText = "–";

          if (join) {
            if (monthStart < new Date(join.getFullYear(), join.getMonth(), 1)) {
              bonusText = "–";
            } else if (
              join.getFullYear() === year &&
              join.getMonth() === monthIndex
            ) {
              const daysWorked = (monthEnd - join) / (1000 * 60 * 60 * 24) + 1;
              const prorated = ((daysWorked / totalDays) * 100).toFixed(1);
              bonusText = `${prorated} EMP`;
            } else {
              bonusText = "100 EMP";
            }
          }

          return (
            <div
              key={i}
              className="px-4 py-1 text-xs text-white/90 rounded text-center"
              style={{ minWidth: "60px" }}
            >
              {bonusText}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YearProgress;
