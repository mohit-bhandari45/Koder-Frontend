import { pistonExecuteAPI } from "@/lib/pistonExecuteAPI";
import { IProblem, TestResult } from "@/types/problem";

async function execute(problem: IProblem, code: string, lang: string, submit: boolean): Promise<TestResult[]> {
    let setOfTestCases = [];

    if (!submit) {
        setOfTestCases = problem.testCases.slice(0, 3); // Limit to first 3 test cases for non-submissions
    } else {
        setOfTestCases = problem.testCases;
    }

    const results: TestResult[] = [];

    for (const testCase of setOfTestCases) {
        const res = await pistonExecuteAPI(code, testCase.stdin, lang);

        const actualOutput = res.stdout?.trim() || "";
        const expectedOutput = testCase.output.trim();
        let possibleOutputs: string[] = [];

        try {
            const parsed = JSON.parse(expectedOutput);
            if (Array.isArray(parsed)) {
                possibleOutputs = parsed.map((o: string) => o.trim());
            }
        } catch {
            possibleOutputs = [expectedOutput];
        }

        const passed = res.status.id === 3 && possibleOutputs.includes(actualOutput);

        results.push({
            input: testCase.input,
            expectedOutput,
            actualOutput,
            passed,
            executionTime: res.time ? res.time : undefined,
        });
    }

    return results;
}

export default execute;