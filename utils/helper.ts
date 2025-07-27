function indent(code: string, level: number = 1): string {
  const spaces = "    ".repeat(level); // 4 spaces for Java
  return code
    .split("\n")
    .map(line => (line.trim() ? spaces + line : ""))
    .join("\n");
}

export {indent};