import { formatDate } from "@/lib/utils";

export function BlogDate({ date }: { date: string }) {
  return (
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      {formatDate(date)}
    </p>
  );
}
