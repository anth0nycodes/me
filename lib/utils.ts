export { cn } from "cn"

export function formatDate(date: string) {
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  return new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
