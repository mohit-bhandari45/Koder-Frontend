"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Twitter, Calendar, Trophy, Target, TrendingUp, Award, Zap, Star } from "lucide-react";

// Dummy data
const dummyUser = {
  username: "johndoe",
  fullname: "John Doe",
  avatar: "https://i.pravatar.cc/150?img=3",
  bio: "Full Stack Developer. Love solving problems!",
  social: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
  stats: {
    solved: 123,
    submissions: 456,
    acceptance: 67,
    ranking: 7890,
    streak: 12,
    maxStreak: 30,
    contestRating: 1850,
  },
  badges: [
    { id: 1, name: "30 Days Streak", icon: "🔥" },
    { id: 2, name: "100 Problems", icon: "🏅" },
    { id: 3, name: "Contest Winner", icon: "🏆" },
  ],
  recentActivity: [
    { id: 1, title: "Two Sum", status: "Accepted", date: "2024-07-20" },
    { id: 2, title: "Reverse Linked List", status: "Wrong Answer", date: "2024-07-19" },
    { id: 3, title: "Valid Parentheses", status: "Accepted", date: "2024-07-18" },
  ],
  solvedProblems: [
    { id: 1, title: "Two Sum", difficulty: "Easy", date: "2024-07-20" },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium", date: "2024-07-19" },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", date: "2024-07-18" },
    { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", date: "2024-07-17" },
    { id: 5, title: "Valid Parentheses", difficulty: "Easy", date: "2024-07-16" },
  ],
  about: "Passionate about algorithms, web development, and open source. Always learning.",
  skills: ["JavaScript", "Python", "React", "Node.js", "Algorithms", "Data Structures"],
};

interface UserType {
  username: string;
  fullname: string;
  avatar: string;
  bio: string;
  social: { github: string; linkedin: string; twitter: string };
  stats: {
    solved: number;
    submissions: number;
    acceptance: number;
    ranking: number;
    streak: number;
    maxStreak: number;
    contestRating: number;
  };
  badges: { id: number; name: string; icon: string }[];
  recentActivity: { id: number; title: string; status: string; date: string }[];
  solvedProblems: { id: number; title: string; difficulty: string; date: string }[];
  about: string;
  skills: string[];
}

function ProfileHeader({ user }: { user: UserType }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 mb-8 border border-gray-800">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-violet-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt="avatar" 
            className="w-32 h-32 rounded-full border-4 border-gray-700 shadow-2xl" 
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-black flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white via-gray-200 to-purple-300 bg-clip-text text-transparent">
            {user.fullname}
          </h1>
          <p className="text-gray-300 text-xl mb-3">@{user.username}</p>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl">{user.bio}</p>
          
          <div className="flex gap-4 justify-center md:justify-start">
            <SocialLink href={user.social.github} icon={Github} />
            <SocialLink href={user.social.linkedin} icon={Linkedin} />
            <SocialLink href={user.social.twitter} icon={Twitter} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/70 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-110"
    >
      <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
    </a>
  );
}

function StatsGrid({ stats }: { stats: UserType['stats'] }) {
  const statItems = [
    { label: "Problems Solved", value: stats.solved, icon: Target, color: "from-green-500 to-green-400" },
    { label: "Total Submissions", value: stats.submissions, icon: TrendingUp, color: "from-blue-500 to-blue-400" },
    { label: "Acceptance Rate", value: `${stats.acceptance}%`, icon: Trophy, color: "from-yellow-500 to-yellow-400" },
    { label: "Global Ranking", value: `#${stats.ranking.toLocaleString()}`, icon: Award, color: "from-purple-500 to-purple-400" },
    { label: "Current Streak", value: stats.streak, icon: Zap, color: "from-orange-500 to-orange-400" },
    { label: "Max Streak", value: stats.maxStreak, icon: Star, color: "from-red-500 to-red-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {statItems.map((stat, index) => (
        <StatCard key={stat.label} {...stat} delay={index * 100} />
      ))}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, delay }: { 
  label: string; 
  value: string | number; 
  icon: any; 
  color: string;
  delay: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`group relative bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div className="text-3xl font-bold text-white mb-1 group-hover:text-gray-200 transition-colors">
          {value}
        </div>
        <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
}

function Badges({ badges }: { badges: UserType['badges'] }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
        <Award className="w-7 h-7 text-yellow-500" />
        Achievements & Badges
      </h3>
      <div className="flex flex-wrap gap-4">
        {badges.map((badge, index) => (
          <div 
            key={badge.id} 
            className={`group flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-purple-600 hover:border-purple-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl transform ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'}`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
              {badge.icon}
            </span>
            <span className="font-semibold">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivity({ activity }: { activity: UserType['recentActivity'] }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
        <Calendar className="w-7 h-7 text-blue-500" />
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activity.map((item, index) => (
          <div 
            key={item.id} 
            className={`group flex items-center justify-between p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300 border border-transparent hover:border-gray-700 ${index === 0 ? 'bg-gradient-to-r from-gray-800/30 to-purple-900/20 border-gray-700' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${item.status === "Accepted" ? "bg-green-500" : "bg-red-500"} group-hover:scale-125 transition-transform duration-300 shadow-lg`}></div>
              <span className="font-semibold text-white group-hover:text-gray-200">{item.title}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                item.status === "Accepted" 
                  ? "bg-green-900/50 text-green-400 border border-green-700 group-hover:bg-green-800/70" 
                  : "bg-red-900/50 text-red-400 border border-red-700 group-hover:bg-red-800/70"
              }`}>
                {item.status}
              </span>
              <span className="text-gray-400 text-sm font-medium">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolvedProblemsTable({ problems }: { problems: UserType['solvedProblems'] }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 mb-8 overflow-x-auto">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
        <Target className="w-7 h-7 text-green-500" />
        Solved Problems
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b-2 border-gray-700">
              <th className="py-4 px-6 text-left font-semibold text-gray-300 uppercase tracking-wider">Problem</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-300 uppercase tracking-wider">Difficulty</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-300 uppercase tracking-wider">Date Solved</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr 
                key={problem.id} 
                className={`border-b border-gray-800 hover:bg-gray-800/50 transition-all duration-300 group ${index % 2 === 0 ? 'bg-gray-900/50' : ''}`}
              >
                <td className="py-4 px-6 font-semibold text-white group-hover:text-gray-200 transition-colors">
                  {problem.title}
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                    problem.difficulty === "Easy" 
                      ? "bg-green-900/50 text-green-400 border-green-700" 
                      : problem.difficulty === "Medium" 
                        ? "bg-yellow-900/50 text-yellow-400 border-yellow-700" 
                        : "bg-red-900/50 text-red-400 border-red-700"
                  }`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-400 font-medium">{problem.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function About({ about, skills }: { about: string; skills: string[] }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
      <h3 className="text-2xl font-bold mb-6 text-white">About Me</h3>
      <p className="text-gray-300 text-lg leading-relaxed mb-6">{about}</p>
      
      <h4 className="text-lg font-semibold text-white mb-4">Technical Skills</h4>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className={`px-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 rounded-full text-sm font-semibold hover:bg-gray-700 hover:border-purple-600 hover:text-purple-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl cursor-default ${index % 3 === 0 ? 'hover:rotate-1' : index % 3 === 1 ? 'hover:-rotate-1' : ''}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 py-8 text-center text-gray-500 border-t border-gray-800">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <span className="font-medium text-gray-300">CodeCraft</span>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-1000"></div>
      </div>
      <p className="text-sm text-gray-400">© 2024 CodeCraft. Inspired by LeetCode. All rights reserved.</p>
    </footer>
  );
}

export default function UserProfilePage() {
  const [user] = useState(dummyUser);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <ProfileHeader user={user} />
        <StatsGrid stats={user.stats} />
        <Badges badges={user.badges} />
        <RecentActivity activity={user.recentActivity} />
        <SolvedProblemsTable problems={user.solvedProblems} />
        <About about={user.about} skills={user.skills} />
      </div>
      <Footer />
    </div>
  );
}