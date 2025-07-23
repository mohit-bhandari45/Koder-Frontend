"use client";

import Left from "@/components/code-editor/left";
import Right from "@/components/code-editor/right";
import { useState } from "react";

const MainEditor = () => {
  const [code, setCode] = useState("//Start coding here");
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState<string>("vs-dark");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="p-3 sm:p-4 lg:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
            Code Editor
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Write, run, and test your code
          </p>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 h-[calc(100vh-100px)] sm:h-[calc(100vh-120px)] lg:h-[calc(100vh-140px)]">
        {/* Mobile/Tablet Layout - Vertical Stack */}
        <div className="flex flex-col lg:hidden h-full gap-3 sm:gap-4">
          {/* Left: Code Editor */}
          <div className="flex-1 min-h-[300px] sm:min-h-[400px]">
            <Left
              language={language}
              setLanguage={setLanguage}
              fontSize={fontSize}
              setFontSize={setFontSize}
              theme={theme}
              setTheme={setTheme}
              code={code}
              setCode={setCode}
            />
          </div>

          {/* Right: Code Execution Panel */}
          <div className="flex-shrink-0 h-[250px] sm:h-[300px]">
            <Right code={code} language={language} />
          </div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden lg:flex h-full gap-6">
          {/* Left: Code Editor */}
          <Left
            language={language}
            setLanguage={setLanguage}
            fontSize={fontSize}
            setFontSize={setFontSize}
            theme={theme}
            setTheme={setTheme}
            code={code}
            setCode={setCode}
          />

          {/* Right: Code Execution Panel */}
          <Right code={code} language={language} />
        </div>
      </div>
    </main>
  );
};

export default MainEditor;