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

        const actualOutput = res.stdout?.trim() || "";
        const expectedOutput = testCase.output.trim();
        let possibleOutputs: string[] = [];

        try {
            const parsed = JSON.parse(expectedOutput);
            if (Array.isArray(parsed)) possibleOutputs = parsed.map((o: string) => o.trim());
        } catch {
            possibleOutputs = [expectedOutput];
        }

        const passed = res.status.id === 3 && possibleOutputs.some((o) => {
            try {
                const expectedArr = JSON.parse(o);
                const actualArr = JSON.parse(actualOutput);

                if (Array.isArray(expectedArr) && Array.isArray(actualArr)) {
                    return expectedArr.slice().sort().toString() === actualArr.slice().sort().toString();
                }

                return o.trim() === actualOutput.trim();
            } catch {
                return o.trim() === actualOutput.trim();
            }
        });

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
        if (!passed) {
            break;
        }
    }

    return results;
}

export default execute;
