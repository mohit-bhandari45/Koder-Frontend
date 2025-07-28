"use client";
import Editor from "@/components/code-editor/editor";
import Description from "@/components/problem/description";
import Head from "@/components/problem/head";
import SubmissionsTab from "@/components/problem/submission";
import MainLoader from "@/components/shared/main-loader";
import { useCodeEditor } from "@/context/CodeEditorContext";
import { languageIdMap } from "@/lib/languageIdMap";
import { addSubmission, getProblemById } from "@/lib/requests.functions";
import { IProblem, SubmissionResult, TestResult } from "@/types/problem";
import execute from "@/utils/utils.problem";
import { problemWrapperMap } from "@/wrappers/problemWrapperMap";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProblemDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"testcase" | "result">("testcase");
  const [mainTab, setMainTab] = useState<"problem" | "submissions">("problem");

  // context
  const { testcaseCode, setTestcaseCode, language, problem, setProblem } =
    useCodeEditor();

  useEffect(() => {
    if (!id) return;

    const fetchProblem = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProblemById(id as string);
        const problem: IProblem = response.data;
        setProblem(problem);
        setTestcaseCode(problem.starterCode[language]);
      } catch (err) {
        console.error("Error fetching problem:", err);
        setError("Failed to load problem. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id, language, setProblem, setTestcaseCode]);

  const runCode = async () => {
    setIsRunning(true);
    setExecutionOutput("");
    setActiveTab("result");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!problem?.examples || problem.examples.length === 0) {
        setExecutionOutput("No examples available to test");
        return;
      }

      // getting a particular lang
      const lang = languageIdMap[language.toLowerCase()];
      if (!lang) {
        setExecutionOutput("Unsupported language selected.");
        return;
      }

      // wrapping code now
      const wrapper = problemWrapperMap[problem.functionName][lang];
      if (!wrapper) {
        setExecutionOutput("No wrapper found for this problem and language.");
        return;
      }

      const wrappedCode = wrapper(testcaseCode);

      // Execute the code against the first 3 test cases
      const results: TestResult[] = await execute(
        problem,
        wrappedCode,
        lang,
        false
      );
      setTestResults(results);

      const passedCount = results.filter((r) => r.passed).length;
      if (passedCount === results.length) {
        setExecutionOutput(`✅ All ${results.length} test cases passed!`);
      } else {
        setExecutionOutput(
          `❌ ${passedCount}/${results.length} test cases passed`
        );
      }
    } catch (err) {
      console.log(err);
      setExecutionOutput(
        `Runtime Error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
      setTestResults([]);
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async () => {
    setIsSubmitting(true);
    setExecutionOutput("");
    setActiveTab("result");

    try {
      if (!problem?.testCases || problem.testCases.length === 0) {
        setExecutionOutput("No test cases available for submission");
        return;
      }

      // getting a particular lang
      const lang = languageIdMap[language.toLowerCase()];
      if (!lang) {
        setExecutionOutput("Unsupported language selected.");
        return;
      }

      // wrapping code now
      const wrapper = problemWrapperMap[problem.functionName][lang];
      if (!wrapper) {
        setExecutionOutput("No wrapper found for this problem and language.");
        return;
      }

      const wrappedCode = wrapper(testcaseCode);

      const results: TestResult[] = await execute(
        problem,
        wrappedCode,
        lang,
        true
      );
      setTestResults(results);

      const passedCount = results.filter((r) => r.passed).length;
      const totalTests = problem.testCases.length;
      const accepted = passedCount === totalTests;

      const result: SubmissionResult = {
        accepted,
        totalTests,
        passedTests: passedCount,
        // runtime: `${Math.floor(Math.random() * 100) + 50}ms`,
        // memory: `${(Math.random() * 10 + 15).toFixed(1)}MB`,
        error: accepted ? undefined : "Wrong Answer",
      };
      setSubmissionResult(result);

      if (accepted) {
        await addSubmission({
          problemId: problem._id as string,
          code: testcaseCode,
          language,
          status: "Accepted",
          // runtime: result.runtime!,
          // memory: result.memory!,
        });

        setExecutionOutput(
          // `🎉 Accepted!\n\nRuntime: ${result.runtime}\nMemory: ${result.memory}\n\nYour solution passed all ${totalTests} test cases.`
          `🎉 Accepted!\n\nYour solution passed all ${totalTests} test cases.`
        );
      } else {
        setExecutionOutput(
          // `❌ ${result.error}\n\n${result.passedTests}/${result.totalTests} test cases passed\n\nRuntime: ${result.runtime}\nMemory: ${result.memory}`
          `❌ ${result.error}\n\n${result.passedTests}/${result.totalTests} test cases passed\n\n`
        );
        await addSubmission({
          problemId: problem?._id as string,
          code: testcaseCode,
          language,
          status: "Rejected",
          // runtime: result.runtime!,
          // memory: result.memory!,
        });
      }
    } catch (err) {
      setExecutionOutput(
        `Submission Error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      setSubmissionResult(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <MainLoader text="Loading Problem..." />;
  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!problem)
    return (
      <div className="text-gray-400 text-center mt-10">Problem not found.</div>
    );

  return (
    <div className="min-h-screen bg-[#18181b] text-white">
      <div className="flex h-screen">
        {/* Left: Problem Details */}
        <div className="w-1/2 overflow-auto border-r border-gray-700">
          <div className="p-6">
            <Link
              href="/problems"
              className="text-indigo-400 hover:underline mb-4 inline-block"
            >
              &larr; Back to Problems
            </Link>

            {/* Main Tabs */}
            <div className="flex bg-gray-800 rounded-lg p-1 mb-6">
              <button
                onClick={() => setMainTab("problem")}
                className={`flex-1 cursor-pointer px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  mainTab === "problem"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Problem
              </button>
              <button
                onClick={() => setMainTab("submissions")}
                className={`flex-1 cursor-pointer px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  mainTab === "submissions"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Submissions
              </button>
            </div>

            {/* Tab Content */}
            {mainTab === "problem" ? (
              <>
                {/* Problem Header */}
                <Head problem={problem} />

                {/* Description */}
                <Description problem={problem} />

                {/* Examples */}
                {problem.examples && problem.examples.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Examples</h3>
                    <div className="space-y-4">
                      {problem.examples.slice(0, 3).map((ex, i) => (
                        <div
                          key={i}
                          className="bg-[#23232a] border border-gray-700 rounded-lg p-4"
                        >
                          <div className="font-semibold text-sm text-gray-300 mb-2">
                            Example {i + 1}:
                          </div>
                          <div className="space-y-2">
                            <div>
                              <span className="font-bold text-gray-300">
                                Input:
                              </span>{" "}
                              <code className="bg-gray-800 px-2 py-1 rounded text-sm">
                                {ex.input}
                              </code>
                            </div>
                            <div>
                              <span className="font-bold text-gray-300">
                                Output:
                              </span>{" "}
                              <code className="bg-gray-800 px-2 py-1 rounded text-sm">
                                {ex.output}
                              </code>
                            </div>
                            {ex.explanation && (
                              <div>
                                <span className="font-bold text-gray-300">
                                  Explanation:
                                </span>{" "}
                                <span className="text-gray-200">
                                  {ex.explanation}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Constraints */}
                {problem.constraints && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                    <div className="bg-[#23232a] border border-gray-700 rounded-lg p-4">
                      <ul className="text-gray-300 space-y-1">
                        {problem.constraints.map((constraint, i) => (
                          <li key={i} className="text-sm">
                            • {constraint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <SubmissionsTab problemId={problem._id as string} />
            )}  
          </div>
        </div>

        {/* Right: Code Editor and Console */}
        <div className="w-1/2 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 border-b border-gray-700">
            <Editor mode="testcase" />
          </div>

          {/* Console/Output Panel */}
          <div className="h-80 bg-[#1e1e1e] border-t border-gray-700 flex flex-col">
            {/* Action Buttons */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex gap-3">
                <button
                  onClick={runCode}
                  disabled={isRunning || isSubmitting}
                  className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  {isRunning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      Running...
                    </>
                  ) : (
                    <>▶️ Run</>
                  )}
                </button>
                <button
                  onClick={submitCode}
                  disabled={isRunning || isSubmitting}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>✓ Submit</>
                  )}
                </button>
              </div>

              {/* Tab Switcher */}
              <div className="flex bg-gray-800 rounded-md p-1">
                <button
                  onClick={() => setActiveTab("testcase")}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    activeTab === "testcase"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Testcase
                </button>
                <button
                  onClick={() => setActiveTab("result")}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    activeTab === "result"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Result
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto p-4">
              {activeTab === "testcase" && (
                <div>
                  <h4 className="text-gray-300 font-medium mb-3">
                    Sample Test Cases
                  </h4>
                  {problem.examples && problem.examples.length > 0 ? (
                    <div className="space-y-3">
                      {problem.examples.map((example, i) => (
                        <div
                          key={i}
                          className="bg-[#23232a] rounded-lg p-3 border border-gray-700"
                        >
                          <div className="text-sm text-gray-400 mb-2">
                            Case {i + 1}
                          </div>
                          <div className="space-y-2">
                            <div>
                              <span className="text-gray-300">Input:</span>
                              <div className="bg-gray-800 mt-1 p-2 rounded font-mono text-sm">
                                {example.input}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-300">
                                Expected Output:
                              </span>
                              <div className="bg-gray-800 mt-1 p-2 rounded font-mono text-sm">
                                {example.output}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-center py-8">
                      No test cases available
                    </div>
                  )}
                </div>
              )}

              {activeTab === "result" && (
                <div>
                  <h4 className="text-gray-300 font-medium mb-3">
                    Execution Result
                  </h4>

                  {/* General Output */}
                  <div className="bg-[#23232a] rounded-lg p-4 border border-gray-700 mb-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-200">
                      {executionOutput ||
                        "Click 'Run' to test your code or 'Submit' for final submission"}
                    </pre>
                  </div>

                  {/* Test Results (only for Run) */}
                  {testResults.length > 0 && (
                    <div>
                      <h5 className="text-gray-300 font-medium mb-2">
                        Test Case Results
                      </h5>
                      <div className="space-y-2">
                        {testResults.map((result, index) => (
                          <div
                            key={index}
                            className={`rounded-lg p-3 border ${
                              result.passed
                                ? "border-green-600 bg-green-900/10"
                                : "border-red-600 bg-red-900/10"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                Example {index + 1}
                              </span>
                              <div className="flex items-center gap-2">
                                {/* {result.executionTime && (
                                  <span className="text-xs text-gray-400">
                                    {result.executionTime}ms
                                  </span>
                                )} */}
                                <span
                                  className={`text-xs px-2 py-1 rounded ${
                                    result.passed
                                      ? "bg-green-600 text-white"
                                      : "bg-red-600 text-white"
                                  }`}
                                >
                                  {result.passed ? "PASS" : "FAIL"}
                                </span>
                              </div>
                            </div>

                            {!result.passed && (
                              <div className="text-sm space-y-1">
                                <div>
                                  <span className="text-gray-400">Input:</span>
                                  <code className="ml-2 text-gray-200">
                                    {result.input}
                                  </code>
                                </div>
                                <div>
                                  <span className="text-gray-400">
                                    Expected:
                                  </span>
                                  <code className="ml-2 text-green-400">
                                    {result.expectedOutput}
                                  </code>
                                </div>
                                <div>
                                  <span className="text-gray-400">
                                    Your Output:
                                  </span>
                                  <code className="ml-2 text-red-400">
                                    {result.actualOutput}
                                  </code>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}