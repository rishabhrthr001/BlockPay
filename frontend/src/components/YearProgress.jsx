import React from "react";

const YearProgress = () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const progress = ((today - startOfYear) / (endOfYear - startOfYear)) * 100;

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

  const amounts = [
    "$100",
    "$200",
    "$150",
    "$300",
    "$250",
    "$400",
    "$350",
    "$500",
    "$450",
    "$600",
    "$550",
    "$700",
  ];

  const reversedMonths = [...months].reverse();
  const reversedAmounts = [...amounts].reverse();

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
        {reversedAmounts.map((amt, i) => (
          <div key={i} className="px-4 py-1 text-xs text-white/90 rounded">
            {amt}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearProgress;
