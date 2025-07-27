import { useCodeEditor } from "@/context/CodeEditorContext";
import { draculaTheme } from "@/themes/dracula";
import { solarizedDarkTheme } from "@/themes/solarized";
import { Editor, OnMount } from "@monaco-editor/react";
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

  // Responsive font size calculation
  const getResponsiveFontSize = () => {
    if (isMobile && fontSize > 16) {
      return Math.max(12, fontSize - 4); // Reduce font size on mobile
    }
    return fontSize;
  };

  // Responsive editor options based on screen size
  const getResponsiveOptions = () => ({
    fontSize: getResponsiveFontSize(),
    minimap: {
      enabled: !isMobile, // Disable minimap on mobile
      maxColumn: isMobile ? 0 : 120,
    },
    wordWrap: "on" as const,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    cursorBlinking: "smooth" as const,
    cursorSmoothCaretAnimation: "on" as const,
    fontLigatures: true,
    lineHeight: isMobile ? 1.4 : 1.6,
    padding: {
      top: isMobile ? 8 : 16,
      bottom: isMobile ? 8 : 16,
    },
    renderLineHighlight: "gutter" as const,
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line" as const,
    mouseWheelZoom: !isMobile, // Disable zoom on mobile to prevent conflicts
    contextmenu: !isMobile, // Disable context menu on mobile
    quickSuggestions: {
      other: true,
      comments: !isMobile, // Reduce suggestions on mobile
      strings: true,
    },
    parameterHints: {
      enabled: !isMobile, // Disable parameter hints on mobile for cleaner UI
    },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: "on" as const,
    tabCompletion: "on" as const,
    wordBasedSuggestions: "currentDocument" as const,
    bracketPairColorization: {
      enabled: true,
    },
    guides: {
      bracketPairs: true,
      indentation: !isMobile, // Disable indentation guides on mobile for cleaner look
    },
    // Mobile-specific options
    scrollbar: {
      vertical: isMobile ? "hidden" : "auto",
      horizontal: isMobile ? "hidden" : "auto",
      verticalScrollbarSize: isMobile ? 8 : 14,
      horizontalScrollbarSize: isMobile ? 8 : 14,
    },
    overviewRulerLanes: isMobile ? 0 : 3,
    hideCursorInOverviewRuler: isMobile,
    overviewRulerBorder: !isMobile,
    lineNumbers: isMobile ? ("off" as const) : ("on" as const), // Hide line numbers on very small screens
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
        onChange={(val) => handleCodeChange(val)}
        theme={theme}
        onMount={handleEditorDidMount}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs sm:text-sm">
                Loading Monaco Editor...
              </span>
            </div>
          </div>
        }
        options={getResponsiveOptions()}
      />

      {/* Mobile overlay for better touch interaction */}
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
