"use client";

import { useState } from "react";

type ProgressType = {
  totalSolved: number;
  totalProblems: number;
  acceptanceRate?: number;
};

export default function ProblemsSolvedCard({ progress }: { progress?: ProgressType }) {
  const [hover, setHover] = useState(false);

  if (!progress || progress.totalProblems <= 0) {
    return <p className="text-gray-400 italic">No problem-solving data available</p>;
  }

  const solved = Math.max(0, Math.min(progress.totalSolved, progress.totalProblems));
  const total = progress.totalProblems;
  const percentage = (solved / total) * 100;
  const circumference = 2 * Math.PI * 45; // r=45
  const dash = (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      {/* Circle wrapper – hover only applies inside the circle */}
      <div
        className="relative w-48 h-48 rounded-full overflow-hidden cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeDasharray={`${dash} ${circumference}`}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>

        {/* Text in center with smooth fade */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Solved state */}
          <div
            className={`flex flex-col items-center justify-center text-center transform transition-all duration-500 ${
              hover ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          >
            <div className="text-3xl font-bold text-white">{solved}</div>
            <div className="text-gray-400 text-sm">/{total}</div>
            <div className="text-gray-300 text-sm mt-1">Solved</div>
          </div>

          {/* Hover (submission %) state */}
          <div
            className={`absolute flex flex-col items-center justify-center text-center transform transition-all duration-500 ${
              hover ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="text-2xl font-bold text-blue-400">
              {percentage.toFixed(1)}%
            </div>
            <div className="text-gray-400 text-sm">Submission Rate</div>
            {progress.acceptanceRate !== undefined && (
              <div className="text-sm text-green-500 mt-1">
                Acc: {progress.acceptanceRate}%
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
