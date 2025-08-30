"use client";
import Editor from "@/components/code-editor/editor";
import Description from "@/components/problem/description";
import Head from "@/components/problem/head";
import SubmissionsTab from "@/components/problem/submission";
import MainLoader from "@/components/shared/main-loader";
import { useCodeEditor } from "@/context/CodeEditorContext";
import { addSubmission, getProblemById } from "@/lib/requests.functions.lib";
import { IProblem, SubmissionResult, TestResult } from "@/types/problem.types";
import execute from "@/utils/problems.utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";

export default function ProblemDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
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
    setTestResults([]);

    try {
      if (!problem?.examples || problem.examples.length === 0) {
        setExecutionOutput("No examples available to test");
        return;
      }

      if (!language) {
        setExecutionOutput("Unsupported language selected.");
        return;
      }

      // Execute the code against the first 3 test cases
      const results: TestResult[] = await execute(
        problem,
        testcaseCode,
        language,
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
    setTestResults([]);

    try {
      if (!problem?.testCases || problem.testCases.length === 0) {
        setExecutionOutput("No test cases available for submission");
        return;
      }

      if (!language) {
        setExecutionOutput("Unsupported language selected.");
        return;
      }

      let passedCount = 0;

      // Execute all test cases with progress callback
      const results: TestResult[] = await execute(
        problem,
        testcaseCode,
        language,
        true,
        (testIndex, passed) => {
          passedCount += passed ? 1 : 0;
          setExecutionOutput(
            `Running Test ${testIndex}/${problem.testCases.length}... Passed: ${passedCount}`
          );
        }
      );

      setTestResults(results);

      const totalTests = problem.testCases.length;
      const accepted = passedCount === totalTests;

      // Total runtime & memory
      const totalRuntime = results.reduce((sum, r) => sum + r.executionTime, 0);
      const totalMemory = results.reduce((sum, r) => sum + (r.memory ?? 0), 0);

      const result: SubmissionResult = {
        accepted,
        totalTests,
        passedTests: passedCount,
        runtime: totalRuntime,
        memory: totalMemory,
        error: accepted ? undefined : "Wrong Answer",
      };

      // Store submission
      await addSubmission({
        problemId: problem._id as string,
        code: testcaseCode,
        language,
        status: accepted ? "Accepted" : "Rejected",
        runtime: result.runtime,
        memory: result.memory,
      });

      setExecutionOutput(
        accepted
          ? `🎉 Accepted!\n\nRuntime: ${(result.runtime /1000).toFixed(2)}s\nMemory: ${(result.memory).toFixed(2)}mb\n\nYour solution passed all ${totalTests} test cases.`
          : `❌ ${result.error}\n\n${passedCount}/${totalTests} test cases passed\n\nRuntime: ${(result.runtime /1000).toFixed(2)}s\nMemory: ${(result.memory).toFixed(2)}mb`
      );
    } catch (err) {
      setExecutionOutput(
        `Submission Error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
      setProblem(problem);
    }
  };

  if (loading) return <MainLoader text="Loading Problem..." />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#18181b]">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  if (!problem)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#18181b]">
        <div className="text-gray-400 text-center">Problem not found.</div>
      </div>
    );

  return (
    <div className="h-screen bg-[#18181b] text-white ">
        <PanelGroup direction="horizontal" className="h-full overflow-hidden overflow-y-scroll">
          {/* Left Panel: Problem Details */}
          <Panel defaultSize={50} minSize={30} maxSize={70}>
            <div className="h-full flex flex-col bg-gray-900/50">
              {/* Header */}
              <div className="flex-shrink-0 p-6 border-b border-gray-700/60">
                <Link
                  href="/problems"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-2 mb-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Problems
                </Link>

                {/* Main Tabs */}
                <div className="flex bg-gray-800 rounded-lg p-1 ">
                  <button
                    onClick={() => setMainTab("problem")}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md cursor-pointer transition-all duration-200 ${
                      mainTab === "problem"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    Problem
                  </button>
                  <button
                    onClick={() => setMainTab("submissions")}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md cursor-pointer transition-all duration-200 ${
                      mainTab === "submissions"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    Submissions
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                {mainTab === "problem" ? (
                  <>
                    <Head problem={problem} />
                    <Description problem={problem} />

                    {/* Examples */}
                    {problem.examples && problem.examples.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-100">Examples</h3>
                        <div className="space-y-5">
                          {problem.examples.slice(0, 3).map((ex, i) => (
                            <div
                              key={i}
                              className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-5 backdrop-blur-sm hover:bg-gray-800/70 transition-colors"
                            >
                              <div className="font-medium text-sm text-blue-300 mb-4">
                                Example {i + 1}:
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <span className="font-semibold text-gray-300 block mb-2">
                                    Input:
                                  </span>
                                  <code className="bg-gray-900 px-4 py-3 rounded-lg text-sm block w-full text-green-300 font-mono">
                                    {ex.input}
                                  </code>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-300 block mb-2">
                                    Output:
                                  </span>
                                  <code className="bg-gray-900 px-4 py-3 rounded-lg text-sm block w-full text-blue-300 font-mono">
                                    {ex.output}
                                  </code>
                                </div>
                                {ex.explanation && (
                                  <div>
                                    <span className="font-semibold text-gray-300 block mb-2">
                                      Explanation:
                                    </span>
                                    <div className="text-gray-200 text-sm leading-relaxed bg-gray-800/30 p-3 rounded-lg">
                                      {ex.explanation}
                                    </div>
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
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-100">Constraints</h3>
                        <div className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-5 backdrop-blur-sm">
                          <ul className="text-gray-300 space-y-2">
                            {problem.constraints.map((constraint, i) => (
                              <li key={i} className="text-sm flex items-start font-mono">
                                <span className="text-blue-400 mr-3 mt-1">•</span>
                                <span>{constraint}</span>
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
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="w-2 bg-gray-700/60 hover:bg-blue-500/50 transition-colors duration-200 relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-8 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></div>
            </div>
          </PanelResizeHandle>

          {/* Right Panel: Code Editor and Console */}
          <Panel defaultSize={50} minSize={30} maxSize={70}>
            <PanelGroup direction="vertical" className="h-full">
              {/* Code Editor Panel */}
              <Panel defaultSize={60} minSize={30} maxSize={80}>
                <div className="h-full bg-gray-900/50 border border-gray-700/60 rounded-tl-lg">
                  <Editor mode="testcase" />
                </div>
              </Panel>

              {/* Vertical Resize Handle */}
              <PanelResizeHandle className="h-2 bg-gray-700/60 hover:bg-blue-500/50 transition-colors duration-200 relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-1 w-8 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></div>
                </div>
              </PanelResizeHandle>

              {/* Console Panel */}
              <Panel defaultSize={40} minSize={20} maxSize={70}>
                <div className="h-full bg-gray-900/50 border border-gray-700/60 rounded-bl-lg flex flex-col">
                  {/* Console Header */}
                  <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-700/60 bg-gray-800/30">
                    <div className="flex gap-3">
                      <button
                        onClick={runCode}
                        disabled={isRunning || isSubmitting}
                        className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800/50 disabled:cursor-not-allowed  cursor-pointer px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border border-gray-600 hover:border-gray-500 shadow-sm"
                      >
                        {isRunning ? (
                          <>
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            Running...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            Run
                          </>
                        )}
                      </button>
                      <button
                        onClick={submitCode}
                        disabled={isRunning || isSubmitting}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-800/50 disabled:cursor-not-allowed px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 flex items-center gap-2 shadow-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Submit
                          </>
                        )}
                      </button>
                    </div>

                    {/* Console Tab Switcher */}
                    <div className="flex bg-gray-800 rounded-lg p-1">
                      <button
                        onClick={() => setActiveTab("testcase")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer duration-200 ${
                          activeTab === "testcase"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-400 hover:text-white hover:bg-gray-700"
                        }`}
                      >
                        Testcase
                      </button>
                      <button
                        onClick={() => setActiveTab("result")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer duration-200 ${
                          activeTab === "result"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-400 hover:text-white hover:bg-gray-700"
                        }`}
                      >
                        Result
                      </button>
                    </div>
                  </div>

                  {/* Console Content */}
                  <div className="flex-1 overflow-auto p-4">
                    {activeTab === "testcase" && (
                      <div>
                        <h4 className="text-gray-300 font-semibold mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Sample Test Cases
                        </h4>
                        {problem.examples && problem.examples.length > 0 ? (
                          <div className="space-y-4">
                            {problem.examples.map((example, i) => (
                              <div
                                key={i}
                                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/60 hover:bg-gray-800/70 transition-colors"
                              >
                                <div className="text-sm text-blue-300 font-medium mb-3">
                                  Case {i + 1}
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <span className="text-gray-300 font-medium block mb-1">Input:</span>
                                    <div className="bg-gray-900 mt-1 p-3 rounded-lg font-mono text-sm text-green-300">
                                      {example.input}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-gray-300 font-medium block mb-1">
                                      Expected Output:
                                    </span>
                                    <div className="bg-gray-900 mt-1 p-3 rounded-lg font-mono text-sm text-blue-300">
                                      {example.output}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-500 text-center py-12 flex flex-col items-center">
                            <svg className="w-12 h-12 text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            No test cases available
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "result" && (
                      <div>
                        <h4 className="text-gray-300 font-semibold mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Execution Result
                        </h4>

                        {/* General Output */}
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/60 mb-4">
                          <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono leading-relaxed">
                            {executionOutput ||
                              "Click 'Run' to test your code or 'Submit' for final submission"}
                          </pre>
                        </div>

                        {/* Test Results */}
                        {testResults.length > 0 && (
                          <div>
                            <h5 className="text-gray-300 font-medium mb-3 flex items-center gap-2">
                              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              Test Case Results
                            </h5>
                            <div className="space-y-3">
                              {testResults.map((result, index) => (
                                <div
                                  key={index}
                                  className={`rounded-lg p-4 border transition-all duration-200 ${
                                    result.passed
                                      ? "border-green-500/50 bg-green-900/20 hover:bg-green-900/30"
                                      : "border-red-500/50 bg-red-900/20 hover:bg-red-900/30"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-200">
                                      Example {index + 1}
                                    </span>
                                    <div className="flex items-center gap-3">
                                      {result.executionTime && (
                                        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                                          {result.executionTime}ms
                                        </span>
                                      )}
                                      <span
                                        className={`text-xs px-3 py-1 rounded-full font-medium ${
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
                                    <div className="text-sm space-y-2">
                                      <div className="bg-gray-900/50 p-3 rounded-lg">
                                        <span className="text-gray-400 block mb-1">Input:</span>
                                        <code className="text-gray-200 font-mono">
                                          {result.input}
                                        </code>
                                      </div>
                                      <div className="bg-gray-900/50 p-3 rounded-lg">
                                        <span className="text-gray-400 block mb-1">Expected:</span>
                                        <code className="text-green-400 font-mono">
                                          {result.expectedOutput}
                                        </code>
                                      </div>
                                      <div className="bg-gray-900/50 p-3 rounded-lg">
                                        <span className="text-gray-400 block mb-1">Your Output:</span>
                                        <code className="text-red-400 font-mono">
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
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
    </div>
  );
}