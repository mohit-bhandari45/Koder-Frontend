import { useCodeEditor } from "@/context/CodeEditorContext";
import { draculaTheme } from "@/themes/dracula.themes";
import { solarizedDarkTheme } from "@/themes/solarized.themes";
import { Editor, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor"; // ✅ for type support
import { useEffect, useState } from "react";

const CodeEditor = ({ mode }: { mode: "practice" | "testcase" }) => {
  const [isMobile, setIsMobile] = useState(false);
  const {
    language,
    fontSize,
    theme,
    practiceCode,
    setPracticeCode,
    testcaseCode,
    setTestcaseCode,
  } = useCodeEditor();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monaco.languages.register({ id: "python" });
    monaco.languages.register({ id: "java" });
    monaco.languages.register({ id: "go" });
    monaco.languages.register({ id: "cpp" });
    monaco.languages.register({ id: "c" });

    monaco.editor.defineTheme("dracula", draculaTheme);
    monaco.editor.defineTheme("solarized", solarizedDarkTheme);

    editor.focus();
  };

  const getResponsiveFontSize = () => {
    if (isMobile && fontSize > 16) {
      return Math.max(12, fontSize - 4);
    }
    return fontSize;
  };

  const getResponsiveOptions = (): monaco.editor.IStandaloneEditorConstructionOptions => ({
    fontSize: getResponsiveFontSize(),
    minimap: {
      enabled: !isMobile,
      maxColumn: isMobile ? 0 : 120,
    },
    wordWrap: "on",
    automaticLayout: true,
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "on",
    fontLigatures: true,
    lineHeight: isMobile ? 1.4 : 1.6,
    padding: {
      top: isMobile ? 8 : 16,
      bottom: isMobile ? 8 : 16,
    },
    renderLineHighlight: "gutter",
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    mouseWheelZoom: !isMobile,
    contextmenu: !isMobile,
    quickSuggestions: {
      other: true,
      comments: !isMobile,
      strings: true,
    },
    parameterHints: {
      enabled: !isMobile,
    },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: "on",
    tabCompletion: "on",
    wordBasedSuggestions: "currentDocument",
    bracketPairColorization: {
      enabled: true,
    },
    guides: {
      bracketPairs: true,
      indentation: !isMobile,
    },
    scrollbar: {
      vertical: isMobile ? "hidden" : "auto",
      horizontal: isMobile ? "hidden" : "auto",
      verticalScrollbarSize: isMobile ? 8 : 14,
      horizontalScrollbarSize: isMobile ? 8 : 14,
    },
    overviewRulerLanes: isMobile ? 0 : 3,
    hideCursorInOverviewRuler: isMobile,
    overviewRulerBorder: !isMobile,
    lineNumbers: isMobile ? "off" : "on",
    glyphMargin: !isMobile,
    folding: !isMobile,
    lineDecorationsWidth: isMobile ? 0 : 10,
    lineNumbersMinChars: isMobile ? 0 : 3,
  });

  const handleCodeChange = (val: string | undefined): void => {
    if (mode === "practice") {
      setPracticeCode(val ?? "");
    } else {
      setTestcaseCode(val ?? "");
    }
  };

  return (
    <div className="h-full w-full relative">
      <Editor
        height="100%"
        language={language}
        value={mode === "practice" ? practiceCode : testcaseCode}
        onChange={handleCodeChange}
        theme={theme}
        onMount={handleEditorDidMount}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs sm:text-sm">Loading Monaco Editor...</span>
            </div>
          </div>
        }
        options={getResponsiveOptions()}
      />

      {isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 right-2 bg-slate-800/80 backdrop-blur-sm rounded px-2 py-1 text-xs text-slate-300 pointer-events-none">
            {language?.toUpperCase() || "CODE"}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
