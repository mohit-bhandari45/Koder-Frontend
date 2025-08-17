"use client";
import { getSubmissionsByProblem } from "@/lib/requests.functions.lib";
import { useEffect, useState, useRef } from "react";

// Submission interface
interface ISubmission {
  _id: string;
  problemId: string;
  code: string;
  language: string;
  status: "Accepted" | "Rejected";
  createdAt: string;
  runtime?: string;
  memory?: string;
}

// Submissions component
const SubmissionsTab = ({ problemId }: { problemId: string }) => {
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ISubmission | null>(null);

  const codeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const result = await getSubmissionsByProblem(problemId);
        setSubmissions(result || []);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      fetchSubmissions();
    }
  }, [problemId]);

  useEffect(()=>{
    if(selectedSubmission && codeRef.current){
      codeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  },[selectedSubmission]);


  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-400">Loading submissions...</span>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">No submissions yet</div>
        <div className="text-sm text-gray-500">
          Start solving the problem to see your submissions here
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Submissions List */}
      <div className="space-y-3">
        {submissions.map((submission, index) => (
          <div
            key={submission._id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedSubmission?._id === submission._id
                ? "border-blue-500 bg-blue-900/10"
                : "border-gray-700 hover:border-gray-600"
            }`}
            onClick={() => setSelectedSubmission(submission)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  #{submissions.length - index}
                </div>
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    submission.status === "Accepted"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {submission.status}
                </div>
                <div className="text-sm text-gray-300 capitalize">
                  {submission.language}
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {new Date(submission.createdAt).toLocaleDateString()} at{" "}
                {new Date(submission.createdAt).toLocaleTimeString()}
              </div>
            </div>
            {submission.runtime && submission.memory && (
              <div className="mt-2 flex space-x-4 text-xs text-gray-400">
                <span>Runtime: {submission.runtime}</span>
                <span>Memory: {submission.memory}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Submission Code */}
      {selectedSubmission && (
        <div className="mt-6" ref={codeRef}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold">Code</h4>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  selectedSubmission.status === "Accepted"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {selectedSubmission.status}
              </span>
              <span className="text-sm text-gray-400 capitalize">
                {selectedSubmission.language}
              </span>
            </div>
          </div>
          <div className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-4">
            <pre className="text-sm text-gray-200 overflow-x-auto whitespace-pre-wrap">
              <code>{selectedSubmission.code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsTab;