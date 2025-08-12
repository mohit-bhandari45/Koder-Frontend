"use client";

import DashboardState from "@/types/dashboard.types";
import { formatRelativeTime } from "@/utils/helper.utils";
import ProblemsSolvedCard from "./ProblemSolvedCard";

export default function MainContent({
  dashboard,
}: {
  dashboard: DashboardState;
}) {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex space-x-5 w-full">
        {/* Total Problems Solved */}
        <div className="w-1/2 bg-gray-900 border border-gray-800 rounded-lg p-6 min-h-[200px]">
          <h3 className="text-lg font-semibold text-center text-white mb-4">
            Total Problems Solved
          </h3>
          <ProblemsSolvedCard progress={dashboard.progress}/>
          {/* <div className="mt-6 space-y-3">
              <DifficultyBar label="Easy" solved={dashboard.progress.byDifficulty.easy} color="bg-green-500" />
              <DifficultyBar label="Med." solved={dashboard.progress.byDifficulty.medium}  color="bg-yellow-500" />
              <DifficultyBar label="Hard" solved={dashboard.progress.byDifficulty.hard} color="bg-red-500" />
            </div> */}
        </div>

        {/* Rank & Achievements */}
        <div className="w-1/2 bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-center text-white mb-4">Rank & Achievements</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Badges Earned</span>
              <span className="text-white font-bold"></span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center"><span className="text-2xl">🥇</span></div>
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center"><span className="text-2xl">🥈</span></div>
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center"><span className="text-2xl">🥉</span></div>
            </div>

            <div className="text-sm text-gray-400 mb-2">Most Recent</div>
            <div className="text-white font-semibold">50-day challenge</div>
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
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Submissions
        </h3>
        {
        dashboard.submissions.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scroll-hide">
            {dashboard.submissions.map((sub) => (
              <div
                key={sub._id}
                className="flex justify-between items-center text-sm text-gray-300 bg-gray-800 p-2 rounded-md"
              >
                <div>
                  <div className="font-medium text-white">{sub.title}</div>
                  <div className="text-xs text-gray-400">
                    {sub.language} • {formatRelativeTime(sub.createdAt)}
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold ${
                    sub.status === "Accepted"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {sub.status}
                </span>
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

// function DifficultyBar({
//   label,
//   solved,
//   total,
//   color,
// }: {
//   label: string;
//   solved: number;
//   total?: number;
//   color: string;
// }) {
//    const percentage = (solved / total) * 100;

//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-3 flex-1">
//         <span className="text-gray-300 text-sm w-10">{label}</span>
//         <div className="text-white font-semibold">{solved}</div>
//         <span className="text-gray-400">/{total}</span>
//       </div>
//       <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
//         <div
//           className={`h-full ${color} rounded-full`}
//           style={{ width: `${percentage}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }
