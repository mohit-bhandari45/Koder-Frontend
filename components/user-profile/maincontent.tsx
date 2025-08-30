"use client";

import DashboardState from "@/types/dashboard.types";
import { formatRelativeTime } from "@/utils/helper.utils";
import ProblemsSolvedCard from "./ProblemSolvedCard";
import Link from "next/link";

export default function MainContent({
  dashboard,
}: {
  dashboard: DashboardState;
}) {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex space-x-5 w-full">
        {/* Total Problems Solved */}
        <div className="w-1/2 bg-black border-[0.5px] border-gray-600 rounded-lg p-6 min-h-[200px]">
          <h3 className="text-lg font-semibold text-center text-white mb-4">
            Total Problems Solved
          </h3>
          <ProblemsSolvedCard progress={dashboard.progress} />
          <div className="mt-6 space-y-3">
            <DifficultyBar
              label="Easy"
              solved={dashboard.progress.byDifficulty.easy.solved}
              total={dashboard.progress.byDifficulty.easy.total}
              color="bg-green-500"
            />
            <DifficultyBar
              label="Med."
              solved={dashboard.progress.byDifficulty.medium.solved}
              total={dashboard.progress.byDifficulty.medium.total}
              color="bg-yellow-500"
            />
            <DifficultyBar
              label="Hard"
              solved={dashboard.progress.byDifficulty.hard.solved}
              total={dashboard.progress.byDifficulty.hard.total}
              color="bg-red-500"
            />
          </div>
        </div>

        {/* Rank & Achievements */}
        <div className="w-1/2 bg-black border-[0.5px] border-gray-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-center text-white mb-4">
            Rank & Achievements
          </h3>
          {/*<div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Badges Earned</span>
              <span className="text-white font-bold"></span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center"><span className="text-2xl">🥇</span></div>
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center"><span className="text-2xl">🥈</span></div>
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center"><span className="text-2xl">🥉</span></div>
            </div> */}

          <div className="text-xl text-center text-gray-400 mb-2">
            Solve problems to unlock badges
          </div>
          {/* <div className="text-white font-semibold">50-day challenge</div> */}
        </div>
      </div>

      {/* Submission Heatmap */}
      {/* <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Submission Heatmap</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Active Days: {user.stats.maxStreak}</span>
            <span>Max Streak: {user.stats.streak}</span>
          </div>
        </div>

        <div className="text-sm text-gray-400 mb-2">
          {user.stats.submissions} total submissions
        </div>

        <div className="grid grid-cols-53 gap-1 mb-2">
          {Array.from({ length: 371 }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-sm ${
                Math.random() > 0.7 ? 'bg-green-500' : 
                Math.random() > 0.5 ? 'bg-green-600' :
                Math.random() > 0.3 ? 'bg-green-700' : 'bg-gray-700'
              }`}
            ></div>
          ))}
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
          <span>Dec</span><span>Jan</span><span>Jul</span>
        </div>
      </div> */}

      {/* Recent Submissions */}
      <div className="bg-black border-[0.5px] border-gray-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Submissions
        </h3>
        {dashboard.submissions.length > 0 ? (
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scroll-hide">
            {dashboard.submissions.map((sub) => (
              <div
                key={sub._id}
                className="flex justify-between items-center text-sm text-gray-300 bg-black/60 border-[3px] border-gray-800 p-3 rounded-md"
              >
                <div>
                  <Link
                    className="font-medium text-white"
                    href={`/submissions/${sub._id}`}
                  >
                    {sub.problemId.title}
                  </Link>
                  <div className="text-xs text-gray-400">
                    {sub.language} • {formatRelativeTime(sub.createdAt)} •{" "}
                    {sub.problemId.difficulty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            No recent submissions found. Try solving a problem!
          </p>
        )}
      </div>
    </div>
  );
}
function DifficultyBar({
  label,
  solved,
  total,
  color,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? (solved / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400">
          {solved}/{total} ({percentage.toFixed(1)}%)
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`${color} h-2 rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
