"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api, { SUBMISSION_BASE } from "@/lib/api.lib";
import Link from "next/link";
import { IProblem } from "@/types/problem.types";
import MainLoader from "@/components/shared/main-loader";

const STATUS_COLORS: Record<"Accepted" | "Pending" | "Rejected", string> = {
  Accepted: "text-green-500 bg-green-100 border-green-400",
  Pending: "text-yellow-600 bg-yellow-100 border-yellow-400",
  Rejected: "text-red-600 bg-red-100 border-red-400",
};

interface Submission {
  _id: string;
  problemId: IProblem;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Accepted" | "Pending" | "Rejected";
  code: string;
  language: string;
  runtime?: number;
  memory?: number;
  createdAt: string;
  updatedAt: string;
  userId: { _id: string; email: string; username: string };
}

export default function SubmissionDetailPage() {
  const params = useParams();
  const { id } = params;
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSubmission = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${SUBMISSION_BASE}/${id}`);
        console.log(res.data.data);
        setSubmission(res.data.data);
      } catch {
        setError("Failed to fetch submission details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id]);

  if (loading) return <MainLoader text="Fetching submission details..." />;
  if (error)
    return (
      <p className="text-center min-h-screen bg-[#18181b] py-10 text-red-400">
        {error}
      </p>
    );
  if (!submission) return null;

  return (
    <div className="min-h-screen bg-[#18181b] text-white py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Problem Title & Difficulty */}
        <div className="flex items-center justify-between bg-[#23232a] rounded-xl p-6 border border-gray-800 shadow-md">
          <div>
            <Link
              href={`/problems/${submission.problemId._id}`}
              className="text-2xl font-bold text-indigo-400 hover:underline"
            >
              {submission.problemId.title}
            </Link>
            <div className="mt-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  submission.problemId.difficulty === "Easy"
                    ? "text-green-400 bg-green-900/40 border border-green-600/30"
                    : submission.problemId.difficulty === "Medium"
                    ? "text-yellow-400 bg-yellow-900/40 border border-yellow-600/30"
                    : "text-red-400 bg-red-900/40 border border-red-600/30"
                }`}
              >
                {submission.problemId.difficulty}
              </span>
            </div>
          </div>
          <div>
            <span
              className={`px-4 py-2 border rounded-full text-sm font-bold ${
                STATUS_COLORS[submission.status]
              }`}
            >
              {submission.status}
            </span>
          </div>
        </div>

        {/* Submission Stats Bar */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Submition Details</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#1f1f29] rounded-xl p-6 border border-gray-800 shadow">
          <div>
            <p className="text-gray-400 text-xs uppercase">Language</p>
            <p className="font-semibold">{submission.language}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase">Runtime</p>
            <p className="font-semibold">
              {submission.runtime != null
                ? (submission.runtime / 1000).toFixed(2)
                : "-"}{" "}
              s
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-xs uppercase">Memory</p>
            <p className="font-semibold">{submission.memory ?? "-"} MB</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase">Submitted At</p>
            <p className="font-semibold">
              {new Date(submission.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Code Section */}
        <div className="bg-[#1e1e2e] rounded-xl shadow-lg border border-gray-800">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold">Submitted Code</h2>
            <span className="text-xs text-gray-400">{submission.language}</span>
          </div>
          <div className="p-4 overflow-x-auto">{submission.code}</div>
        </div>
      </div>
    </div>
  );
}
