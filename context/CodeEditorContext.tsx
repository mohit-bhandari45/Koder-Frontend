"use client";

import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Define the context type
export type CodeEditorContextType = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const CodeEditorContext = createContext<CodeEditorContextType | undefined>(undefined);

export const CodeEditorProvider = ({ children }: { children: ReactNode }) => {
  const [code, setCode] = useState("//Start coding here");
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState<string>("vs-dark");

  return (
    <CodeEditorContext.Provider
      value={{ code, setCode, language, setLanguage, fontSize, setFontSize, theme, setTheme }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
};

export const useCodeEditor = () => {
  const context = useContext(CodeEditorContext);
  if (!context) {
    throw new Error("useCodeEditor must be used within a CodeEditorProvider");
  }
  return context;
}; 