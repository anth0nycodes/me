import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CraftCard } from "@/components/craft/craft-card";
import { FormattedDate } from "@/components/formatted-date";
import { ExternalLink } from "@/components/ui/external-link";
import { getCraftNote } from "@/data/craft";
import { DATA } from "@/data/me";
import { CRAFTS } from "../constants";

interface CraftNotePageProps {
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
  const note = await getCraftNote(slug);
  if (!note) return;
  const { metadata } = note;
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

export default async function CraftNotePage({ params }: CraftNotePageProps) {
  const { slug } = await params;
  const craft = CRAFTS.find((craft) => craft.id === slug);
  const note = await getCraftNote(slug);

  if (!craft || !note) {
    notFound();
  }

  const { Component: Note, metadata } = note;

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
          <div className="flex items-center justify-between gap-4">
            <FormattedDate date={metadata.publishedAt} />
            <div className="flex items-center gap-2">
              {craft.reference && (
                <ExternalLink variant="underline" label="reference" href={craft.reference} />
              )}
              <ExternalLink variant="underline" label="source" href={craft.source} />
            </div>
          </div>
        </header>
        <CraftCard craft={craft} isSlugRoute={true} />
      </div>
      <article className="prose text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-a:text-foreground prose-figcaption:text-neutral-600 dark:prose-figcaption:text-gray-500 max-w-none">
        <Note />
      </article>
    </div>
  );
}

export const dynamicParams = false;
