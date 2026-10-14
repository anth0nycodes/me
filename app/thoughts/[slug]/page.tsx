import { ComponentType } from "react";
import type { Metadata } from "next";
import { BlogDate } from "@/components/thoughts/blog-date";
import { getBlogPosts, type PostMetadata } from "@/data/blog";
import { DATA } from "@/data/me";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const { metadata } = (await import(`@/content/${slug}.mdx`)) as {
    metadata: PostMetadata;
  };

  const { title, publishedAt: publishedTime, summary: description, image } = metadata;
  const ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/thoughts/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const { default: Post, metadata } = (await import(`@/content/${slug}.mdx`)) as {
    default: ComponentType;
    metadata: PostMetadata;
  };

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: metadata.title,
            datePublished: metadata.publishedAt,
            dateModified: metadata.publishedAt,
            description: metadata.summary,
            image: metadata.image
              ? `${DATA.url}${metadata.image}`
              : `${DATA.url}/og?title=${metadata.title}`,
            url: `${DATA.url}/thoughts/${slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium tracking-tighter">{metadata.title}</h1>
        <BlogDate date={metadata.publishedAt} />
      </header>
      <article className="prose text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-a:text-foreground max-w-none">
        <Post />
      </article>
    </section>
  );
}

export const dynamicParams = false;
