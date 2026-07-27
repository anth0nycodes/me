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
    <section>
      <h1 className="lowercase text-3xl mb-8 tracking-tighter font-medium">
        <span className="inline-flex gap-3 items-center">
          💭
          <span>my thoughts</span>
        </span>
      </h1>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <Link
            key={id}
            className="flex flex-col space-y-1 mb-4"
            href={`/thoughts/${post.slug}`}
          >
            <div className="w-full group flex flex-col">
              <p className="tracking-tight group-hover:text-primary duration-200">
                {post.metadata.title}
              </p>
              <p className="h-6 text-xs text-muted-foreground">
                {post.metadata.publishedAt}
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
}
