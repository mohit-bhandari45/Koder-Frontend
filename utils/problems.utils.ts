import { judge0ExecuteAPI } from "@/lib/judge0API.lib";
import { IProblem, TestResult } from "@/types/problem.types";

async function execute(
    problem: IProblem,
    code: string,
    lang: string,
    submit: boolean,
    onTestComplete?: (index: number, passed: boolean) => void
): Promise<TestResult[]> {

    const setOfTestCases = submit ? problem.testCases : problem.testCases.slice(0, 3);
    const results: TestResult[] = [];

    for (let i = 0; i < setOfTestCases.length; i++) {
        const testCase = setOfTestCases[i];
        const res = await judge0ExecuteAPI(code, testCase.stdin, lang);

        const actualOutput = (res.stdout || "").trim();
        const expectedOutput = testCase.output.trim();
        let passed = false;

        try {
            // Try parsing as JSON
            const expectedParsed = JSON.parse(expectedOutput);
            const actualParsed = JSON.parse(actualOutput);

            // Both arrays -> compare after sorting
            if (Array.isArray(expectedParsed) && Array.isArray(actualParsed)) {
                passed = expectedParsed.slice().sort().toString() === actualParsed.slice().sort().toString();
            } else {
                // For boolean, object, or any primitive -> direct comparison
                passed = expectedParsed === actualParsed;
            }

        } catch {
            // If not JSON -> compare as string (covers boolean outputs like "true"/"false")
            passed = actualOutput === expectedOutput;
        }

        // Only pass if judge0 status is OK
        passed = passed && res.status.id === 3;

        const testResult: TestResult = {
            input: testCase.input,
            expectedOutput,
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
