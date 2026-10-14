import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CraftCard } from "@/components/craft/craft-card";
import { BlogDate } from "@/components/thoughts/blog-date";
import { DATA } from "@/data/me";
import { CraftNoteMetadata, CRAFTS } from "../constants";

interface CraftItemPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CRAFTS.map((craft) => ({ slug: craft.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const { metadata } = (await import(`../notes/${slug}.mdx`)) as {
    metadata: CraftNoteMetadata;
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
      url: `${DATA.url}/craft/${slug}`,
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

export default async function CraftNotePage({ params }: CraftItemPageProps) {
  const { slug } = await params;
  const craft = CRAFTS.find((craft) => craft.id === slug);

  if (!craft) {
    notFound();
  }

  const { default: Note, metadata } = (await import(`../notes/${slug}.mdx`)) as {
    default: ComponentType;
    metadata: CraftNoteMetadata;
  };

  return (
    <div className="flex flex-col gap-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: metadata.title,
            datePublished: metadata.publishedAt,
            dateModified: metadata.publishedAt,
            description: metadata.summary,
            image: metadata.image
              ? `${DATA.url}${metadata.image}`
              : `${DATA.url}/og?title=${metadata.title}`,
            url: `${DATA.url}/craft/${slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium tracking-tighter">{metadata.title}</h1>
          <BlogDate date={metadata.publishedAt} />
        </header>
        <CraftCard craft={craft} isSlugRoute={true} />
      </div>
      <article className="prose text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-a:text-foreground max-w-none">
        <Note />
      </article>
    </div>
  );
}
