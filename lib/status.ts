export function determineStatusColor(status: string) {
  if (status.toLowerCase() === "in development") {
    return "border bg-yellow-500/15 border-yellow-600 text-amber-700 dark:text-amber-400";
  }

  return "border bg-green-800/15 border-green-600 text-green-800 dark:text-green-400";
}
