import { languageIdMapJudge } from "./languageIdMap.lib";

const API_URL = "https://ce.judge0.com"; // Use rapidapi or self-hosted if needed

export async function judge0ExecuteAPI(
    code: string,
    input: string,
    language: string
) {
    try {
        const response = await fetch(
            `${API_URL}/submissions?base64_encoded=false&wait=true&fields=stdout,stderr,status,time,memory`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source_code: code,
                    language_id: languageIdMapJudge[language], // Judge0 requires numeric ID
                    stdin: input
                })
            }
        );

        const result = await response.json();

        // Converting time from seconds (string) to milliseconds (number)
        const executionTimeMs = result.time ? parseFloat(result.time) * 1000 : 0;

        // Converting memory from KB -> MB
        const memoryMb = result.memory ? result.memory / 1024 : 0;

        return {
            stdout: result.stdout?.trim() || "",
            stderr: result.stderr?.trim() || "",
            status: {
                id: result.status?.id || 0,
                description: result.status?.description || "Unknown"
            },
            time: executionTimeMs, // in milliseconds
            memory: memoryMb
        };
    } catch (error) {
        console.error("Judge0 API error:", error);
        throw error;
    }
}
