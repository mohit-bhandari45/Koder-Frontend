import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function indent(code: string, level: number = 1): string {
  const spaces = "    ".repeat(level); // 4 spaces for Java
  return code
    .split("\n")
    .map(line => (line.trim() ? spaces + line : ""))
    .join("\n");
}

export {indent};

dayjs.extend(relativeTime);

export function formatRelativeTime(date: Date): string {
  const now = dayjs();
  const target = dayjs(date);

  const diffInSeconds = now.diff(target, "second");

  if (diffInSeconds < 60) {
    return "just now";
  }

  return target.fromNow();
}