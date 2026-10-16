import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FormattedDate } from "@/components/formatted-date";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";
import { DATA } from "@/data/me";

interface CaseStudyPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = await getCaseStudy(slug);
  if (!post) return;
  const { metadata } = post;
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
      url: `${DATA.url}/case-studies/${slug}`,
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

export default async function CaseStudyPostPage({ params }: CaseStudyPostPageProps) {
  const { slug } = await params;
  const post = await getCaseStudy(slug);
  if (!post) {
    notFound();
  }
  const { Component: CaseStudy, metadata } = post;

  return (
    <section id="case-studies">
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
            url: `${DATA.url}/case-studies/${slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium tracking-tighter">{metadata.title}</h1>
        <FormattedDate date={metadata.publishedAt} />
      </header>
      <article className="prose text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-a:text-foreground prose-figcaption:text-neutral-600 dark:prose-figcaption:text-gray-500 max-w-none">
        <CaseStudy />
      </article>
    </section>
  );
}

export const dynamicParams = false;
