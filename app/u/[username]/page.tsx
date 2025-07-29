"use client";

import {
  Bell,
  Code,
  Menu,
  Search
} from "lucide-react";
import { useState } from "react";

// Dummy data
const dummyUser = {
  username: "PriyanshuRawat0000",
  fullname: "Priyanshu Rawat",
  avatar: "https://i.pravatar.cc/150?img=3",
  bio: "Full Stack Developer at JIIT. Love solving problems!",
  location: "India",
  institute: "JIIT",
  social: {
    github: "https://github.com/PriyanshuRawat0000",
    linkedin: "https://linkedin.com/in/priyanshurawat",
    twitter: "https://twitter.com/priyanshu",
  },
  stats: {
    solved: 466,
    totalProblems: 3626,
    submissions: 1372,
    acceptance: 67,
    ranking: 176155,
    globalRanking: 106483,
    streak: 198,
    maxStreak: 239,
    contestRating: 1675,
    attendedContests: 16,
    topPercentage: 15.02,
    badges: 8,
    easy: { solved: 141, total: 886 },
    medium: { solved: 273, total: 1885 },
    hard: { solved: 52, total: 855 },
  },
  badges: [
    { id: 1, name: "100 Days Badge 2025", icon: "🏅", recent: true },
    { id: 2, name: "50 Days Badge", icon: "🔥" },
    { id: 3, name: "Contest Participant", icon: "🏆" },
  ],
  recentActivity: [
    { id: 1, title: "Two Sum", status: "Accepted", date: "2024-07-20" },
    {
      id: 2,
      title: "Reverse Linked List",
      status: "Wrong Answer",
      date: "2024-07-19",
    },
    {
      id: 3,
      title: "Valid Parentheses",
      status: "Accepted",
      date: "2024-07-18",
    },
  ],
  solvedProblems: [
    { id: 1, title: "Two Sum", difficulty: "Easy", date: "2024-07-20" },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      date: "2024-07-19",
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      date: "2024-07-18",
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      date: "2024-07-17",
    },
    {
      id: 5,
      title: "Valid Parentheses",
      difficulty: "Easy",
      date: "2024-07-16",
    },
  ],
  about:
    "Passionate about algorithms, web development, and open source. Always learning new technologies and solving complex problems.",
  skills: ["C++", "Python", "SQL", "JavaScript", "React", "Node.js"],
  languages: [
    { name: "C++", solved: 465, color: "bg-blue-500" },
    { name: "Python", solved: 89, color: "bg-green-500" },
    { name: "JavaScript", solved: 45, color: "bg-yellow-500" },
  ],
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Code className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold text-white">LeetCode</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Explore
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Problems
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Contest
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Discuss
            </a>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                Interview
              </button>
            </div>
            <div className="relative group">
              <button className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
                Store
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <div className="text-orange-500 font-semibold">0</div>
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <img src={dummyUser.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            </div>
            <span className="text-yellow-400 font-semibold">Premium</span>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-2 space-y-2">
            <a href="#" className="block text-gray-300 hover:text-white py-2">Explore</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Problems</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Contest</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Discuss</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Interview</a>
            <a href="#" className="block text-yellow-400 hover:text-yellow-300 py-2">Store</a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

// function LeftSidebar({ user }) {
//   return (
//     <div className="w-full lg:w-80 space-y-6">
//       {/* Profile Card */}
//       <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//         <div className="flex items-start gap-4">
//           <div className="relative">
//             <img
//               src={user.avatar}
//               alt="avatar"
//               className="w-16 h-16 rounded-full border-2 border-gray-700"
//             />
//             <div className="absolute -bottom-1 -right-1 bg-blue-500 w-5 h-5 rounded-full border-2 border-gray-900 flex items-center justify-center">
//               <div className="w-2 h-2 bg-white rounded-full"></div>
//             </div>
//           </div>
          
//           <div className="flex-1">
//             <h1 className="text-xl font-bold text-white mb-1">{user.fullname}</h1>
//             <p className="text-gray-400 text-sm mb-2">{user.username}</p>
//             <div className="text-sm text-gray-300 mb-3">
//               Rank <span className="font-semibold text-white">{user.stats.ranking.toLocaleString()}</span>
//             </div>
//           </div>
//         </div>

//         <div className="mt-4 space-y-3">
//           <div className="flex items-center gap-2 text-gray-300 text-sm">
//             <span>📍</span>
//             <span>{user.location}</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-300 text-sm">
//             <span>🎓</span>
//             <span>{user.institute}</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-300 text-sm">
//             <Github className="w-4 h-4" />
//             <span>{user.username}</span>
//           </div>
//         </div>

//         <div className="mt-4 flex gap-2">
//           <SocialLink href={user.social.github} icon={Github} />
//           <SocialLink href={user.social.linkedin} icon={Linkedin} />
//           <SocialLink href={user.social.twitter} icon={Twitter} />
//         </div>
//       </div>

//       {/* Community Stats */}
//       <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//         <h3 className="text-lg font-semibold text-white mb-4">Community Stats</h3>
//         <div className="space-y-4">
//           <StatRow icon="👀" label="Views" value="0" />
//           <StatRow icon="💡" label="Solution" value="0" />
//           <StatRow icon="💬" label="Discuss" value="0" />
//           <StatRow icon="⭐" label="Reputation" value="0" />
//         </div>
//       </div>

//       {/* Languages */}
//       <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//         <h3 className="text-lg font-semibold text-white mb-4">Languages</h3>
//         <div className="space-y-3">
//           {user.languages.map((lang) => (
//             <div key={lang.name} className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className={`w-3 h-3 rounded-full ${lang.color}`}></div>
//                 <span className="text-gray-300">{lang.name}</span>
//               </div>
//               <span className="text-gray-400 text-sm">{lang.solved} problems solved</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatRow({ icon, label, value }) {
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-2">
//         <span className="text-blue-500">{icon}</span>
//         <span className="text-gray-300 text-sm">{label}</span>
//       </div>
//       <span className="text-white font-semibold">{value}</span>
//     </div>
//   );
// }

// function SocialLink({ href, icon: Icon }) {
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700 hover:border-gray-600"
//     >
//       <Icon className="w-4 h-4 text-gray-300" />
//     </a>
//   );
// }

// function MainContent({ user }) {
//   return (
//     <div className="flex-1 space-y-6">
//       {/* Contest Rating & Global Ranking */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//           <div className="text-gray-400 text-sm mb-1">Contest Rating</div>
//           <div className="text-2xl font-bold text-white">{user.stats.contestRating}</div>
//           <div className="mt-4">
//             <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
//               <div className="h-full bg-orange-500 rounded-full" style={{ width: '65%' }}></div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//           <div className="text-gray-400 text-sm mb-1">Global Ranking</div>
//           <div className="text-2xl font-bold text-white">{user.stats.globalRanking.toLocaleString()}</div>
//           <div className="text-gray-400 text-sm mt-1">/{user.stats.totalProblems.toLocaleString()}</div>
//         </div>

//         <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//           <div className="text-gray-400 text-sm mb-1">Attended</div>
//           <div className="text-2xl font-bold text-white">{user.stats.attendedContests}</div>
//           <div className="text-gray-400 text-sm mt-1">contests</div>
//         </div>
//       </div>

//       {/* Top Percentage */}
//       <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//         <div className="text-gray-400 text-sm mb-2">Top</div>
//         <div className="text-4xl font-bold text-white mb-4">{user.stats.topPercentage}%</div>
//         <div className="grid grid-cols-12 gap-1 h-20">
//           {Array.from({ length: 144 }, (_, i) => (
//             <div
//               key={i}
//               className={`h-2 rounded-sm ${
//                 i < 20 ? 'bg-orange-500' : 'bg-gray-700'
//               }`}
//             ></div>
//           ))}
//         </div>
//       </div>

//       {/* Solved Problems Circle */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//           <div className="flex items-center justify-center">
//             <div className="relative w-48 h-48">
//               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//                 <circle
//                   cx="50" cy="50" r="45"
//                   fill="none"
//                   stroke="#374151"
//                   strokeWidth="8"
//                 />
//                 <circle
//                   cx="50" cy="50" r="45"
//                   fill="none"
//                   stroke="url(#gradient)"
//                   strokeWidth="8"
//                   strokeDasharray={`${(user.stats.solved / user.stats.totalProblems) * 283} 283`}
//                   strokeLinecap="round"
//                 />
//                 <defs>
//                   <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#10b981" />
//                     <stop offset="50%" stopColor="#f59e0b" />
//                     <stop offset="100%" stopColor="#ef4444" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//               <div className="absolute inset-0 flex flex-col items-center justify-center">
//                 <div className="text-3xl font-bold text-white">{user.stats.solved}</div>
//                 <div className="text-gray-400 text-sm">/{user.stats.totalProblems}</div>
//                 <div className="text-gray-300 text-sm mt-1">Solved</div>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-6 space-y-3">
//             <DifficultyBar 
//               label="Easy" 
//               solved={user.stats.easy.solved} 
//               total={user.stats.easy.total}
//               color="bg-green-500"
//             />
//             <DifficultyBar 
//               label="Med." 
//               solved={user.stats.medium.solved} 
//               total={user.stats.medium.total}
//               color="bg-yellow-500"
//             />
//             <DifficultyBar 
//               label="Hard" 
//               solved={user.stats.hard.solved} 
//               total={user.stats.hard.total}
//               color="bg-red-500"
//             />
//           </div>
//         </div>

//         {/* Badges */}
//         <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-white">Badges</h3>
//             <span className="text-2xl font-bold text-white">{user.stats.badges}</span>
//           </div>
          
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
//               <span className="text-2xl">🥇</span>
//             </div>
//             <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
//               <span className="text-2xl">🥈</span>
//             </div>
//             <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
//               <span className="text-2xl">🥉</span>
//             </div>
//           </div>

//           <div className="text-sm text-gray-400 mb-2">Most Recent Badge</div>
//           <div className="text-white font-semibold">100 Days Badge 2025</div>
//         </div>
//       </div>

//       {/* Submissions Calendar */}
//       <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-white">{user.stats.submissions} submissions in the past one year</span>
//           <div className="flex items-center gap-4 text-sm text-gray-400">
//             <span>Total active days: {user.stats.maxStreak}</span>
//             <span>Max streak: {user.stats.streak}</span>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-53 gap-1">
//           {Array.from({ length: 371 }, (_, i) => (
//             <div
//               key={i}
//               className={`w-2 h-2 rounded-sm ${
//                 Math.random() > 0.7 ? 'bg-green-500' : 
//                 Math.random() > 0.5 ? 'bg-green-600' :
//                 Math.random() > 0.3 ? 'bg-green-700' : 'bg-gray-700'
//               }`}
//             ></div>
//           ))}
//         </div>
        
//         <div className="flex justify-between text-xs text-gray-400 mt-2">
//           <span>Aug</span>
//           <span>Sep</span>
//           <span>Oct</span>
//           <span>Nov</span>
//           <span>Dec</span>
//           <span>Jan</span>
//           <span>Jul</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function DifficultyBar({ label, solved, total, color }) {
//   const percentage = (solved / total) * 100;
  
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

// export default function UserProfilePage() {
//   const [user] = useState(dummyUser);

//   return (
//     <div className="min-h-screen bg-black">
//       <Navbar />
//       <div className="max-w-7xl mx-auto py-8 px-4">
//         <div className="flex flex-col lg:flex-row gap-8">
//           <LeftSidebar user={user} />
//           <MainContent user={user} />
//         </div>
//       </div>
//     </div>
//   );
// }