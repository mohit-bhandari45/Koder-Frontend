import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

dayjs.extend(relativeTime);

export function formatRelativeTime(dateString: string): string {
  const now = dayjs();
  const target = dayjs(dateString);

  const diffInSeconds = now.diff(target, "second");

  if (diffInSeconds < 60) {
    return "just now";
  }

  return target.fromNow();
}
