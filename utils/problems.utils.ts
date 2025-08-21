import { judge0ExecuteAPI } from "@/lib/judge0API.lib";
import { IProblem, TestResult } from "@/types/problem.types";

async function execute(
    problem: IProblem,
    code: string,
    lang: string,
    submit: boolean,
    onTestComplete?: (index: number, passed: boolean) => void,
): Promise<TestResult[]> {

    const setOfTestCases = submit ? problem.testCases : problem.testCases.slice(0, 3);
    const results: TestResult[] = [];

    for (let i = 0; i < setOfTestCases.length; i++) {
        const testCase = setOfTestCases[i];
        const res = await judge0ExecuteAPI(code, testCase.stdin, lang);

        const actualOutput = (res.stdout || "").trim();  // will always return string, parse accordingly
        let expectedOutput = testCase.stdout;
        let passed = false;

        try {
            // Try parsing as JSON
            if (Array.isArray(expectedOutput)) {
                const solution = expectedOutput.filter((expected) => {
                    return JSON.stringify(expected) === actualOutput;
                })
                if (solution.length > 0) {
                    passed = true;
                }
                expectedOutput = expectedOutput[0];
            } else if (typeof expectedOutput === "boolean") {
                passed = expectedOutput === JSON.parse(actualOutput);
            }
        } catch {
            // If not JSON -> compare as string (covers boolean outputs like "true"/"false")
            passed = expectedOutput === expectedOutput;
        }

        // Only pass if judge0 status is OK
        passed = passed && res.status.id === 3;

        const testResult: TestResult = {
            input: testCase.input,
            expectedOutput: JSON.stringify(expectedOutput),
            actualOutput,
            passed,
            executionTime: res.time,
            memory: res.memory
        };

        results.push(testResult);

        if (onTestComplete) onTestComplete(i + 1, passed);

        // STOP if a test fails
        if (!passed) break;
    }

    return results;
}

export default execute;
