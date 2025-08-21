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

  const nextYear = today.getFullYear() + 1;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 flex flex-col items-center">
      <div className="flex">
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
      </div>

      <p className="text-white/80 text-sm mt-6">
        🎉 You’ll receive <span className="font-semibold">1000 Golu coins</span>{" "}
        on Jan 1, {nextYear}
      </p>
    </div>
  );
};

export default YearProgress;
