import Image from "next/image";
import Link from "next/link";
import type { BasePost } from "@/data/mdx";

/** The case studies as cards, two across on wider screens. Used on home and on /case-studies. */
export function CaseStudyCards({ posts }: { posts: BasePost[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2">
      {posts.map((post) => (
        <li key={post.slug}>
          <CaseStudyCard post={post} />
        </li>
      ))}
    </ul>
  );
}

function CaseStudyCard({ post }: { post: BasePost }) {
  const { slug, metadata } = post;
  // the case study's hero on its own background. Phones get a taller box with the whole image fitted
  // inside (covering would crop the art's sides); from sm up it's the 5:2 box it gets on its page
  const cover = metadata.hero?.src ?? metadata.image;
  const byline = [metadata.role, metadata.timeline].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group flex flex-col gap-4 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring) focus-visible:ring-offset-4 focus-visible:ring-offset-(--background)"
    >
      <div
        className="bg-muted ring-border relative aspect-[16/10] overflow-hidden rounded-xl ring-1 sm:aspect-[5/2]"
        style={{ background: metadata.hero?.background }}
      >
        {cover && (
          // decorative here: the title right below names the case study
          <Image
            src={cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-heading text-[1.375rem] leading-snug font-medium tracking-[-0.01em]">
          {metadata.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{metadata.summary}</p>
        {byline && <p className="text-muted-foreground text-xs">{byline}</p>}
      </div>
    </Link>
  );
}
