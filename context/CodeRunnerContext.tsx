"use client";

import axios, { AxiosError } from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type CodeRunnerContextType = {
  runCode: (code: string, language: string) => void;
  clearOutput: () => void;
  output: string;
  setOutput: Dispatch<SetStateAction<string>>;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  isRunning: boolean;
};

const CodeRunnerContext = createContext<CodeRunnerContextType | undefined>(
  undefined
);

export const CodeRunnerProvider = ({ children }: { children: ReactNode }) => {
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  function getExtension(lang: string): string {
    switch (lang) {
      case "python3":
        return "py";
      case "javascript":
        return "js";
      case "java":
        return "java";
      case "c":
        return "c";
      case "cpp":
        return "cpp";
      default:
        return "txt";
    }
  }

  const runCode = async (code: string, language: string) => {
    setIsRunning(true);
    setOutput("");

    try {
      const res = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language,
        version: "*",
        files: [
          {
            name: `main.${getExtension(language)}`,
            content: code,
          },
        ],
      });

      console.log(res.data.run.output);
      setOutput(res.data.run.output || "⚠️ No output received from server.");
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        setOutput("❌ Error: " + error.response.data);
      } else if (error.request) {
        setOutput("❌ No response from server.");
      } else {
        setOutput("❌ " + error.message);
      }
    }

    setIsRunning(false);
  };

  const clearOutput = () => {
    setOutput("");
  };

  return (
    <CodeRunnerContext.Provider
      value={{
        runCode,
        clearOutput,
        output,
        setOutput,
        isRunning,
        setIsRunning,
      }}
    >
      {children}
    </CodeRunnerContext.Provider>
  );
};

export const useCodeRunner = () => {
  const context = useContext(CodeRunnerContext);
  if (!context) {
    throw new Error("useCodeRunner must be used within a CodeRunnerProvider");
  }
  return context;
};
