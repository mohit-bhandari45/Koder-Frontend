export async function pistonExecuteAPI(
    code: string,
    input: string,
    language: string
) {
    try {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language: language,
                version: "*",
                files: [
                    {
                        name: "Main.txt",
                        content: code,
                    },
                ],
                stdin: input,
            }),
        });

        const result = await response.json();

        return {
            stdout: result.run.stdout ?? "",
            stderr: result.run.stderr ?? "",
            status: { id: result.run.code === 0 ? 3 : 6 }, // 3 = success, 6 = failure
            time: result.run.time ?? "0",
        };
    } catch (error) {
        console.error("Piston API error:", error);
        throw error;
    }
}
