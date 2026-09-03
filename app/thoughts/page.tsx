import { BlogLink } from "@/components/blog-link";
import { getBlogPosts } from "@/data/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

export default function ThoughtsPage() {
  const posts = getBlogPosts();

  return (
    <section className="flex flex-col gap-4">
      <h1 className="lowercase border-b pb-2 border-[#222222] text-base font-medium">
        <span>
          my thoughts
          <sup className="ml-1.5 select-none text-muted-foreground text-xs">
            ({posts.length})
          </sup>
        </span>
      </h1>
      <div className="group flex flex-col">
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <BlogLink key={post.slug} post={post} />
          ))}
      </div>
    </section>
  );
}
