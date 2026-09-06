import { BlogDate } from "@/components/blog-date";
import { getBlogPosts, type PostMetadata } from "@/data/blog";
import { DATA } from "@/data/me";
import type { Metadata } from "next";
import { ComponentType } from "react";

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

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = metadata;
  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${title}`;

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
  const { default: Post, metadata } = (await import(
    `@/content/${slug}.mdx`
  )) as {
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
      <h1 className="title font-medium text-2xl tracking-tighter max-w-162">
        <span className="inline-block">{metadata.title}</span>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-162">
        <BlogDate date={metadata.publishedAt} />
      </div>
      <article className="prose max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-a:text-foreground">
        <Post />
      </article>
    </section>
  );
}

export const dynamicParams = false;
