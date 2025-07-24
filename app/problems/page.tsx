"use client";
import { useEffect, useState } from "react";
import { IProblem } from "@/types/problem";
import MainLoader from "@/components/shared/main-loader";
import Link from "next/link";
import { getProblems } from "@/lib/requests.functions";

const DIFFICULTY_COLORS: Record<IProblem["difficulty"], string> = {
  Easy: "text-green-500 bg-green-100 border-green-400",
  Medium: "text-yellow-600 bg-yellow-100 border-yellow-400",
  Hard: "text-red-600 bg-red-100 border-red-400",
};

export default function ProblemsPage() {
  const [problems, setProblems] = useState<IProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProblems(page);
        setProblems(data.data);
        setTotalPages(data.totalPages);
      } catch {
        setError("Failed to fetch problems.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, [page]);

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <MainLoader text="Loading Problems..." />;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-[#18181b] text-white py-12 px-2 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Problems</h1>
        {/* Search Bar */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded border border-gray-700 bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg bg-[#23232a] border border-gray-800">
          <table className="min-w-full divide-y divide-gray-700 text-sm">
            <thead className="bg-[#20202a] sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left font-semibold tracking-wider">#</th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider">Title</th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider">Difficulty</th>
                <th className="px-6 py-3 text-left font-semibold tracking-wider">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">No problems found.</td>
                </tr>
              ) : (
                filteredProblems.map((problem, idx) => (
                  <tr
                    key={problem._id}
                    className="hover:bg-[#28283a] transition cursor-pointer group"
                  >
                    <td className="px-6 py-4 text-gray-400 font-mono w-8">{(page - 1) * 30 + idx + 1}</td>
                    <td className="px-6 py-4 font-semibold whitespace-nowrap text-left">
                      <Link href={`/problems/${problem._id}`} className="text-indigo-400 group-hover:underline">
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 border rounded-full text-xs font-bold ${DIFFICULTY_COLORS[problem.difficulty]}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {problem.tags && problem.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {problem.tags.map((tag: string) => (
                            <span key={tag} className="bg-[#31314a] text-indigo-200 px-2 py-0.5 rounded-full text-xs border border-indigo-400/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs">-</span>
                      )}
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
  );
} 