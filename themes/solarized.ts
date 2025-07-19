import * as monaco from "monaco-editor";

export const solarizedDarkTheme: monaco.editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "", foreground: "839496", background: "002B36" }, // default text
    { token: "comment", foreground: "586E75", fontStyle: "italic" },
    { token: "keyword", foreground: "859900", fontStyle: "bold" },
    { token: "number", foreground: "2AA198" },
    { token: "string", foreground: "B58900" },
    { token: "type", foreground: "268BD2" },
    { token: "function", foreground: "268BD2" },
    { token: "class", foreground: "CB4B16" },
    { token: "interface", foreground: "B58900" },
    { token: "constant", foreground: "D33682" },
    { token: "variable", foreground: "839496" },
    { token: "parameter", foreground: "93A1A1" },
    { token: "operator", foreground: "6C71C4" },
    { token: "delimiter", foreground: "586E75" },
    { token: "delimiter.bracket", foreground: "93A1A1" },
    { token: "namespace", foreground: "2AA198" },
    { token: "property", foreground: "B58900" },
    { token: "label", foreground: "D33682" },
    { token: "regexp", foreground: "DC322F" },
  ],
  colors: {
    "editor.background": "#002B36",
    "editor.foreground": "#839496",
    "editorCursor.foreground": "#93A1A1",
    "editor.lineHighlightBackground": "#073642",
    "editorLineNumber.foreground": "#586E75",
    "editor.selectionBackground": "#073642",
    "editor.inactiveSelectionBackground": "#002B36",
    "editorIndentGuide.background": "#073642",
    "editorIndentGuide.activeBackground": "#586E75",
  },
};
