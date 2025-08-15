export type Severity =
  | "success"
  | "info"
  | "warn"
  | "error"
  | "secondary"
  | "contrast"
  | undefined

export interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ITestCase {
  input: string;
  output: string;
  explanation: string;
  stdin: string;
}

export interface ILanguageCodeMap {
  [language: string]: string;
}

export interface IProblem {
  _id?: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  examples: IExample[];
  testCases: ITestCase[];
  constraints: string[];

  starterCode: ILanguageCodeMap;
  solution?: ILanguageCodeMap,
  functionName: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface TestResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
  executionTime: number;
  memory: number
}

export interface SubmissionResult {
  accepted: boolean;
  totalTests: number;
  passedTests: number;
  runtime: number;
  memory: number;
  error?: string;
}

