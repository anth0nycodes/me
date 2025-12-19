import Link from "next/link";

interface VaultCardProps {
  title: string;
  src: string;
  author: string;
  description: string;
}

export function VaultCard({ title, src, author, description }: VaultCardProps) {
  return (
    <Link key={title} target="_blank" href={src}>
      <div className="flex flex-col justify-between p-6 h-full border rounded-lg hover:bg-accent transition-colors group">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium tracking-tighter group-hover:underline">
              {title}
            </p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <p className="text-sm tracking-tighter font-medium text-muted-foreground">
            by {author}
          </p>
        </div>
      </div>
    </Link>
  );
}
