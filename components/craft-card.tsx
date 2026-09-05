import { type Craft } from "@/app/craft/page";

interface CraftCardProps {
  craft: Craft;
}

export function CraftCard({ craft }: CraftCardProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="relative border border-accent rounded-lg overflow-clip w-full aspect-video">
        <div className="absolute inset-0 flex items-center justify-center [&>svg]:h-full [&>svg]:w-auto">
          {craft.component}
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          {craft.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-background font-medium select-none text-xs sm:text-sm rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <span className="text-center text-sm sm:text-base w-full text-foreground italic">
        {craft.description}
        {craft.inspirationSource && craft.inspirationHref && (
          <>
            , inspired by{" "}
            <a
              href={craft.inspirationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {craft.inspirationSource}
            </a>
            .
          </>
        )}
      </span>
    </div>
  );
}
