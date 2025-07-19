import { draculaTheme } from "@/themes/dracula";
import { solarizedDarkTheme } from "@/themes/solarized";
import { Editor, OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  language?: string;
  fontSize: number;
  value: string;
  onChange: (value: string | undefined) => void;
  theme: string
}

const CodeEditor = ({
  language,
  value,
  fontSize,
  onChange,
  theme,
}: CodeEditorProps) => {
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

  return (
    <div className="h-[calc(100vh-280px)] w-full relative">
      {/* Loading overlay */}
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading editor...</div>
      </div>
      
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={onChange}
        theme={theme}
        onMount={handleEditorDidMount}
        loading={
          <div className="flex items-center justify-center h-full bg-slate-900">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading Monaco Editor...</span>
            </div>
          </div>
        }
        options={{
          fontSize: fontSize,
          minimap: { enabled: true },
          wordWrap: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          fontLigatures: true,
          lineHeight: 1.6,
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: "gutter",
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: "line",
          mouseWheelZoom: true,
          contextmenu: true,
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true
          },
          parameterHints: {
            enabled: true
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: "on",
          tabCompletion: "on",
          wordBasedSuggestions: "currentDocument",
          bracketPairColorization: {
            enabled: true
          },
          guides: {
            bracketPairs: true,
            indentation: true
          }
        }}
      />
    </div>
  );
};

export default CodeEditor;