"use client";

import api, { GET_ALL_SUBMISSIONS_ENDPOINT } from "@/lib/api.lib";
import { useEffect, useState } from "react";
import { formatRelativeTime } from "@/utils/helper.utils";
import Link from "next/link";
import { IProblem } from "@/types/problem.types";
import MainLoader from "@/components/shared/main-loader";
import Navbar from "@/components/user-profile/navbar";

const STATUS_COLORS: Record<"Accepted" | "Pending" | "Rejected", string> = {
    Accepted: "text-green-500",
    Pending: "text-yellow-600 ",
    Rejected: "text-red-600 ",
};

interface ISubmission {
    _id: string;
    problemId: IProblem;
    status: "Accepted" | "Pending" | "Rejected";
    code: string;
    language: string;
    createdAt: Date;
}

export default function SubmissionsPage() {

    const [submissions, setSubmissions] = useState<ISubmission[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);

    const getSubmissions = async (page = 1) => {
        const res = await api.get(`${GET_ALL_SUBMISSIONS_ENDPOINT}?page=${page}`);
        return res.data.data;
    };


    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getSubmissions(page);
                setPage(data.page);
                setTotalPages(data.totalPages);
                setSubmissions(data.submissions);
            } catch {
                setError("Failed to fetch submissions.Retry later...");
            } finally {
                setLoading(false);
            }
        }
        fetchSubmissions();
    }, [page]);

    if (loading) {
        return <MainLoader text="Loading submissions..." />
    }
    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-[#18181b] text-white ">
            <Navbar />
            <div className="max-w-5xl mx-auto py-12 px-2 md:px-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    My Submissions
                </h1>
                <div className="overflow-x-auto rounded-lg shadow-lg bg-[#23232a] border border-gray-800">
                    <table className="min-w-full divide-y divide-gray-700 text-sm">
                        <thead className="bg-[#20202a] sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold tracking-wider">#</th>
                                <th className="px-6 py-3 text-left font-semibold tracking-wider">Problem</th>
                                <th className="px-6 py-3 text-left font-semibold tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left font-semibold tracking-wider">Language</th>
                                <th className="px-6 py-3 text-left font-semibold tracking-wider">Submitted At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {submissions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-gray-400">No submissions yet.</td>
                                </tr>
                            ) : (
                                submissions.map((submission, idx) => (
                                    <tr
                                        key={submission._id}
                                        className="hover:bg-[#28283a] transition cursor-pointer group"
                                    >
                                        <td className="px-6 py-4 text-gray-400 font-mono w-8">{(page - 1) * 30 + idx + 1}</td>
                                        <td className="px-6 py-4 font-semibold whitespace-nowrap text-start">
                                            <Link href={`/submissions/${submission._id}`} className="text-indigo-400 group-hover:underline">
                                                {submission.problemId.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-1 py-1  text-xs font-bold ${STATUS_COLORS[submission.status]
                                                    }`}
                                            >
                                                {submission.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{submission.language}</td>

                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                            {formatRelativeTime(submission.createdAt)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        className="px-4 py-2 rounded bg-[#23232a] border border-gray-700 text-white hover:bg-[#28283a] disabled:opacity-50"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="text-lg font-medium">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className="px-4 py-2 rounded bg-[#23232a] border border-gray-700 text-white hover:bg-[#28283a] disabled:opacity-50"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    )
}