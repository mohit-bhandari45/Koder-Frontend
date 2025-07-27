"use client";

import { useCodeEditor } from "@/context/CodeEditorContext";
import { useCodeRunner } from "@/context/CodeRunnerContext";
import React from "react";

const Right = () => {
  const { output, isRunning, clearOutput, runCode } = useCodeRunner();
  const { practiceCode, language } = useCodeEditor();

  return (
    <div className="w-full lg:max-w-md lg:w-[400px] xl:w-[450px] flex flex-col h-full min-h-[400px] md:min-h-[500px]">
      {/* Output Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Output
            </h3>
          </div>
          <div className="flex gap-1 sm:gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => runCode(practiceCode, language)}
              disabled={isRunning}
              className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 transition-all duration-200 shadow-lg hover:shadow-green-500/25 flex-1 sm:flex-none justify-center"
            >
              {isRunning ? (
                <>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Running...</span>
                  <span className="sm:hidden">Run</span>
                </>
              ) : (
                <>
                  <svg
                    width="12"
                    height="12"
                    className="sm:w-4 sm:h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                  <span className="font-medium">Run Code</span>
                </>
              )}
            </button>

            <button
              onClick={clearOutput}
              className="px-2 sm:px-4 cursor-pointer py-1.5 sm:py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-md hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-lg hover:shadow-slate-500/25 flex items-center justify-center min-w-[36px] sm:min-w-[44px]"
            >
              <svg
                width="12"
                height="12"
                className="sm:w-4 sm:h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Output Area */}
      <div className="flex-1 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden shadow-2xl min-h-[250px] sm:min-h-[350px]">
        <div className="bg-slate-800/50 px-3 sm:px-4 py-2 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-slate-400 text-xs sm:text-sm font-mono">
              Terminal
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-4 h-full overflow-auto">
          {isRunning ? (
            <div className="space-y-1 sm:space-y-2 animate-pulse flex flex-col gap-0.5">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 sm:h-3 bg-slate-700 rounded w-full"
                  style={{
                    width: `${Math.random() * 40 + 60}%`,
                  }}
                />
              ))}
            </div>
          ) : output ? (
            <pre className="text-green-400 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed break-words overflow-wrap-anywhere">
              {output}
            </pre>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 px-2 sm:px-4">
              <svg
                width="32"
                height="32"
                className="sm:w-12 sm:h-12 mb-3 sm:mb-4 opacity-50"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-center text-xs sm:text-sm leading-relaxed">
                Click{" "}
                <span className="text-green-400 font-mono">
                  &quot;Run Code&quot;
                </span>{" "}
                to execute your code...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Right;
