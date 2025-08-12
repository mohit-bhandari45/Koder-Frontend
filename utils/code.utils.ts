function parseInputToStdin(rawInput: string): string {
    const match = rawInput.match(/nums\s*=\s*\[([^\]]+)\],\s*target\s*=\s*(-?\d+)/);
    if (!match) return "";

    const nums = match[1].split(",").map((n) => n.trim()).join(" "); // turn into "2 7 11 15"
    const target = match[2].trim();

    return `${nums}\n${target}`; // e.g., "2 7 11 15\n9"
}


export { parseInputToStdin };