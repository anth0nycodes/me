import { Metadata } from "next";
import { PostLink } from "@/components/post-link";
import { THOUGHT_POSTS, THOUGHTS_FOLDER_NAME } from "@/data/thoughts";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "My thoughts on software development, life, and more.",
};

export default async function ThoughtsPage() {
  return (
    <section data-thoughts className="flex flex-col gap-2">
      <h1 className="text-muted-foreground dark:text-foreground border-separator border-b pb-2 text-base font-medium capitalize">
        <span>
          thoughts
          <sup className="text-muted-foreground ml-1.5 text-xs select-none">
            ({THOUGHT_POSTS.length})
          </sup>
        </span>
      </h1>
      <div className="group flex flex-col">
        {THOUGHT_POSTS.map((post) => (
          <PostLink key={post.slug} folderName={THOUGHTS_FOLDER_NAME} post={post} />
        ))}
      </div>
    </section>
  );
}
