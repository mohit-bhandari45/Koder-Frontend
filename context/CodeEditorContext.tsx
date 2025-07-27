"use client";

import { IProblem } from "@/types/problem";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

// Define the context type
export type CodeEditorContextType = {
  practiceCode: string;
  setPracticeCode: Dispatch<SetStateAction<string>>;
  testcaseCode: string;
  setTestcaseCode: Dispatch<SetStateAction<string>>;
  problem: IProblem | null
  setProblem: Dispatch<SetStateAction<IProblem | null>>
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const CodeEditorContext = createContext<CodeEditorContextType | undefined>(
  undefined
);

export const CodeEditorProvider = ({ children }: { children: ReactNode }) => {
  const [practiceCode, setPracticeCode] = useState("// Start coding here");
  const [testcaseCode, setTestcaseCode] = useState("// Start coding here");
  const [problem, setProblem] = useState<IProblem | null>(null);
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState<string>("vs-dark");

  return (
    <CodeEditorContext.Provider
      value={{
        practiceCode,
        setPracticeCode,
        testcaseCode,
        setTestcaseCode,
        problem,
        setProblem,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        theme,
        setTheme,
      }}
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
