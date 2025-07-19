import * as monaco from "monaco-editor";

export const draculaTheme: monaco.editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "", foreground: "F8F8F2", background: "282A36" }, // Default text
    { token: "comment", foreground: "6272A4", fontStyle: "italic" },
    { token: "keyword", foreground: "FF79C6", fontStyle: "bold" },
    { token: "number", foreground: "BD93F9" },
    { token: "string", foreground: "F1FA8C" },
    { token: "variable", foreground: "F8F8F2" },
    { token: "function", foreground: "50FA7B" },
    { token: "class", foreground: "FFB86C" },
    { token: "interface", foreground: "8BE9FD" },
    { token: "type", foreground: "8BE9FD" },
    { token: "parameter", foreground: "FFB86C" },
    { token: "property", foreground: "FFB86C" },
    { token: "constant", foreground: "FF5555" },
    { token: "operator", foreground: "FF79C6" },
    { token: "namespace", foreground: "BD93F9" },
    { token: "label", foreground: "FF79C6" },
    { token: "regexp", foreground: "FF5555" },
    { token: "delimiter", foreground: "F8F8F2" },
    { token: "delimiter.bracket", foreground: "F8F8F2" },
  ],
  colors: {
    "editor.background": "#282A36",
    "editor.foreground": "#F8F8F2",
    "editorLineNumber.foreground": "#44475A",
    "editorCursor.foreground": "#F8F8F2",
    "editor.selectionBackground": "#44475A",
    "editor.inactiveSelectionBackground": "#44475A88",
    "editorIndentGuide.background": "#44475A",
    "editorIndentGuide.activeBackground": "#6272A4",
    "editorLineHighlightBackground": "#3E4451",
    "editorLineHighlightBorder": "#00000000",
  },
};
