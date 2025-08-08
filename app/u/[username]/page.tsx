"use client";

import Navbar from "@/components/user-profile/navbar";
import LeftSidebar from "@/components/user-profile/leftsidebar";
import MainContent from "@/components/user-profile/maincontent";
import { useState } from "react";

export type Submission = {
  id: number;
  title: string;
  status: string;
  lang: string;
  time: string;
};

export type SolvedProblem = {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  date: string;
};

export type RecentActivity = {
  id: number;
  title: string;
  status: string;
  date: string;
};

export type Badge = {
  id: number;
  name: string;
  icon: string;
  recent?: boolean;
};

export type LanguageStat = {
  name: string;
  solved: number;
  color: string;
};

export type SkillLevel = {
  level: "Fundamental" | "Intermediate" | "Advanced";
  topics: string[];
};

export type Stats = {
  solved: number;
  totalProblems: number;
  acceptance: number;
  ranking: number;
  globalRanking: number;
  streak: number;
  maxStreak: number;
  contestRating: number;
  attendedContests: number;
  topPercentage: number;
  badges: number;
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  twitter: string;
};

export type User = {
  username: string;
  fullname: string;
  avatar: string;
  bio: string;
  location: string;
  institute: string;
  social: SocialLinks;
  submissions: Submission[];
  stats: Stats;
  badges: Badge[];
  recentActivity: RecentActivity[];
  solvedProblems: SolvedProblem[];
  about: string;
  languages: LanguageStat[];
  skills: SkillLevel[];
};


// Dummy data
const dummyUser : User = {
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
  submissions:[
  {
    id: 1,
    title: "Two Sum",
    status: "Accepted",
    lang: "JavaScript",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Median of Two Sorted Arrays",
    status: "Wrong Answer",
    lang: "Python",
    time: "4 hours ago",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    status: "Time Limit Exceeded",
    lang: "Java",
    time: "7 hours ago",
  },
  {
    id: 4,
    title: "Merge Intervals",
    status: "Accepted",
    lang: "C++",
    time: "1 day ago",
  },
  {
    id: 5,
    title: "Binary Tree Inorder Traversal",
    status: "Runtime Error",
    lang: "C",
    time: "2 days ago",
  },
  {
    id: 6,
    title: "Best Time to Buy and Sell Stock",
    status: "Accepted",
    lang: "Java",
    time: "3 days ago",
  },
  {
    id: 7,
    title: "Add Two Numbers",
    status: "Wrong Answer",
    lang: "Python",
    time: "5 days ago",
  },
  {
    id: 8,
    title: "Find Minimum in Rotated Sorted Array",
    status: "Accepted",
    lang: "C++",
    time: "1 week ago",
  },
],
  stats: {
    solved: 466,
    totalProblems: 3626,
   
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
  languages: [
    { name: "C++", solved: 465, color: "bg-blue-500" },
    { name: "Python", solved: 89, color: "bg-green-500" },
    { name: "JavaScript", solved: 45, color: "bg-yellow-500" },
  ],
  skills: [
    {
      level: "Fundamental",
      topics: ["Arrays", "Strings", "Math"],
    },
    {
      level: "Intermediate",
      topics: ["DP", "Hashing", "Two Pointers"],
    },
    {
      level: "Advanced",
      topics: ["Segment Tree", "Graphs", "Union Find"],
    },
  ],
};

export default function UserProfilePage() {
  const [user] = useState(dummyUser);

  return (
    <div className="min-h-screen bg-black scrollbar-track">
      <Navbar user={user} />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <LeftSidebar user={user} />
          <MainContent user={user} />
        </div>
      </div>
    </div>
  );
}