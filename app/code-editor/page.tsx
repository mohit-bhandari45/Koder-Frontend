"use client";

import CodeEditor from "@/components/code-editor/CodeEditor";
import {
  defaultComments,
  languageOptions,
  themeOptions,
} from "@/components/code-editor/data";
import { useCodeRunner } from "@/context/CodeRunnerContext";
import { useState } from "react";

const Editor = () => {
  const [code, setCode] = useState("//Start coding here");
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState<string>("vs-dark");
  const { output, isRunning, clearOutput, runCode } = useCodeRunner();

  const changeLang = (e: { target: { value: string } }) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(defaultComments[selectedLang] || "// Start coding here");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-white mb-2">Code Editor</h1>
          <p className="text-slate-300">Write, run, and test your code</p>
        </div>
      </div>

      <div className="p-6 h-[calc(100vh-120px)]">
        <div className="flex h-full gap-6">
          {/* Left: Code Editor */}
          <div className="flex-1 min-w-0">
            {/* Controls Panel */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 mb-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Language selector */}
                <div className="flex items-center gap-2">
                  <label className="text-slate-300 font-medium text-sm">
                    Language:
                  </label>
                  <select
                    value={language}
                    onChange={changeLang}
                    className="bg-slate-700 cursor-pointer text-white border border-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font size selector */}
                <div className="flex items-center gap-2">
                  <label className="text-slate-300 font-medium text-sm">
                    Font Size:
                  </label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="bg-slate-700 text-white border cursor-pointer border-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((size) => (
                      <option key={size} value={size}>
                        {size}px
                      </option>
                    ))}
                  </select>
                </div>

                {/* Theme selector */}
                <div className="flex items-center gap-2">
                  <label className="text-slate-300 font-medium text-sm">
                    Theme:
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="bg-slate-700 text-white border cursor-pointer border-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {themeOptions.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Code Editor Container */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden shadow-2xl">
              <CodeEditor
                language={language}
                value={code}
                theme={theme}
                onChange={(val) => setCode(val ?? "")}
                fontSize={fontSize}
              />
            </div>
          </div>

          {/* Right: Code Execution Panel */}
          <div className="w-96 flex flex-col">
            {/* Output Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-white">Output</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => runCode(code, language)}
                    disabled={isRunning}
                    className="px-4 py-2 cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Running...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 5v14l11-7z" fill="currentColor" />
                        </svg>
                        <span className="text-sm font-medium">Run Code</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearOutput}
                    className="px-4 cursor-pointer py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-md hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-lg hover:shadow-slate-500/25"
                  >
                    <svg
                      width="16"
                      height="16"
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
            <div className="flex-1 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-400 text-sm font-mono">
                    Terminal
                  </span>
                </div>
              </div>

              <div className="p-4 h-full overflow-auto">
                {isRunning ? (
                  <div className="space-y-2 animate-pulse flex flex-col gap-0.5">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-3 bg-slate-700 rounded w-full"
                      />
                    ))}
                  </div>
                ) : output ? (
                  <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                    {output}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-4 opacity-50"
                    >
                      <path
                        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-center text-sm">
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
        </div>
      </div>
    </main>
  );
};

export default Editor;
