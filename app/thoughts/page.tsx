import { Metadata } from "next";
import { ThoughtLink } from "@/components/thoughts/thought-link";
import { THOUGHT_POSTS } from "@/data/thoughts";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "My thoughts on software development, life, and more.",
};

export default async function ThoughtsPage() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-muted-foreground dark:text-foreground border-separator border-b pb-2 text-base font-medium lowercase">
        <span>
          my thoughts
          <sup className="text-muted-foreground ml-1.5 text-xs select-none">
            ({THOUGHT_POSTS.length})
          </sup>
        </span>
      </h1>
      <div className="group flex flex-col">
        {THOUGHT_POSTS.map((post) => (
          <ThoughtLink key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
