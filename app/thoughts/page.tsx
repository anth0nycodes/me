import { getBlogPosts } from "@/data/blog";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

export default async function ThoughtsPage() {
  const posts = await getBlogPosts();

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
      <div className="flex flex-col gap-2">
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
          .map((post, id) => (
            <Link
              key={id}
              className="group flex flex-col hover:bg-accent rounded-sm p-3 -mx-3 duration-150"
              href={`/thoughts/${post.slug}`}
            >
              <p className="text-sm font-semibold mb-1 group-hover:text-primary duration-200">
                {post.metadata.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {post.metadata.publishedAt}
              </p>
            </Link>
          ))}
      </div>
    </section>
  );
}
