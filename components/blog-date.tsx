import { formatDate } from "@/lib/utils";

export function BlogDate({ date }: { date: string }) {
  return (
    <p className="text-sm text-muted-foreground">
      {formatDate(date)}
    </p>
  );
}
