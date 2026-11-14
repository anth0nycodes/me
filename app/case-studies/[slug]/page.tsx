import type { ReactNode } from "react";
import { Metadata } from "next";
import { getImageProps } from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyToc } from "@/components/case-study/case-study-toc";
import { ScrollReveal } from "@/components/case-study/scroll-reveal";
import {
  CASE_STUDIES,
  getCaseStudy,
  getCaseStudyHeadings,
} from "@/data/case-studies";
import { DATA } from "@/data/me";
import { cn } from "@/lib/utils";

// the title and details block; the table of contents appears once it scrolls away
const DETAILS_ID = "case-study-details";
// the hero box runs edge to edge up to its 1370px max width
const HERO_SIZES = "(max-width: 1370px) 100vw, 1370px";

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

export default async function CaseStudyPostPage({
  params,
}: CaseStudyPostPageProps) {
  const { slug } = await params;
  const post = await getCaseStudy(slug);
  if (!post) {
    notFound();
  }
  const { Component: CaseStudy, metadata } = post;
  const headings = getCaseStudyHeadings(slug);
  // getImageProps ignores `priority`, so fetchPriority keeps the hero loading first
  const heroImage =
    metadata.hero &&
    getImageProps({
      src: metadata.hero.src,
      alt: metadata.hero.alt,
      fill: true,
      sizes: HERO_SIZES,
      fetchPriority: "high",
      loading: "eager",
      className: cn(
        "object-cover",
        metadata.hero.desktopCutout &&
          "lg:object-contain lg:object-bottom lg:pt-[3%]"
      ),
    }).props;
  const heroDesktopSrcSet =
    metadata.hero?.desktopSrc &&
    getImageProps({
      src: metadata.hero.desktopSrc,
      alt: "",
      fill: true,
      sizes: HERO_SIZES,
    }).props.srcSet;
  const details: { label: string; value: ReactNode }[] = [
    { label: "Timeline", value: metadata.timeline },
    { label: "Role", value: metadata.role },
    { label: "Team", value: metadata.team },
    { label: "Tools", value: metadata.tools },
    {
      label: "Link",
      value: metadata.link && (
        <a
          href={metadata.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-muted-foreground inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
        >
          {metadata.link.label}
          <ArrowUpRight aria-hidden className="size-3.5" />
        </a>
      ),
    },
  ].filter((detail) => Boolean(detail.value));

  return (
    // data-case-study widens the root layout's main column for this page
    <section id="case-studies" data-case-study>
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
      {/* full-bleed visual preview. The negative margin cancels the body's side padding so the band
          runs edge to edge. Inside it, every case study gets the same 5:2 box: it grows with the
          screen up to 34.25rem tall, then stops and lets the band's background fill the sides. The
          image covers the box, so it is never squashed or letterboxed; make hero art 5:2 (e.g.
          1400×560) and nothing gets cropped either */}
      <div
        aria-hidden={metadata.hero ? undefined : true}
        className="bg-muted -mx-6"
        style={{ background: metadata.hero?.background }}
      >
        <div className="relative mx-auto aspect-[5/2] h-[min(40vw,34.25rem)] max-w-full">
          {heroImage && (
            // art direction: a tighter crop from lg up when the case study has one, the original
            // below that. Both still go through Next's optimizer via getImageProps
            <picture>
              {heroDesktopSrcSet && (
                <source
                  media="(min-width: 1024px)"
                  srcSet={heroDesktopSrcSet}
                  sizes={HERO_SIZES}
                />
              )}
              <img {...heroImage} alt={metadata.hero?.alt ?? ""} />
            </picture>
          )}
        </div>
      </div>
      {/* anchored to the left of the screen, lined up with the nav: the list, then a column that runs
          wide for images (5vw in from each side of the screen) and keeps text to a readable
          measure (see .case-study-article) */}
      <div className="mt-12 w-full lg:grid lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-x-10 lg:px-[5vw]">
        {/* the sticky box is a full viewport tall, so the list sits centered on screen */}
        <aside className="hidden lg:block">
          <div className="sticky top-0 flex h-dvh items-center">
            <CaseStudyToc headings={headings} triggerId={DETAILS_ID} />
          </div>
        </aside>
        <div className="min-w-0">
          <header
            id={DETAILS_ID}
            className="flex max-w-[52.5rem] flex-col gap-6"
          >
            <h1 className="font-heading text-[1.875rem] leading-tight tracking-[-0.01em] text-balance sm:text-[2.5rem]">
              {metadata.title}
            </h1>
            {/* phones: a two-column grid so the details line up. Wider: each column is as wide as its
                content, so short values don't leave wide gaps */}
            {details.length > 0 && (
              <dl className="grid grid-cols-2 gap-x-8 gap-y-5 text-sm sm:flex sm:flex-wrap sm:gap-x-12">
                {details.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 sm:w-max sm:max-w-full"
                  >
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </header>
          <article
            data-reveal-root
            className="case-study-article prose text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-a:text-foreground prose-figcaption:text-neutral-600 dark:prose-figcaption:text-muted-foreground mt-12 max-w-none"
          >
            <CaseStudy />
          </article>
          <ScrollReveal selector="[data-reveal-root] > *" />
        </div>
      </div>
    </section>
  );
}

export const dynamicParams = false;
