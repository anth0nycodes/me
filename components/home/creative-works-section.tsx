import { ExternalLink } from "@/components/ui/external-link";
import { Video } from "@/components/ui/video";
import { DATA } from "@/data/me";

export function CreativeWorksSection() {
  return (
    <section aria-labelledby="creative-works-heading" className="flex flex-col gap-6">
      <h2
        id="creative-works-heading"
        className="text-muted-foreground dark:text-foreground border-separator border-b pb-2 text-base font-medium capitalize"
      >
        creative works
        <sup className="text-muted-foreground ml-1.5 text-xs select-none">
          ({DATA.creativeWorks.length})
        </sup>
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6">
        {DATA.creativeWorks.map((work) => (
          <div key={work.video} className="flex flex-col gap-4">
            <Video
              poster={`/works/posters/${work.video}.webp`}
              srcSet={[`/works/webm/${work.video}.webm`, `/works/mp4/${work.video}.mp4`]}
              aria-labelledby={`${work.video}-title`}
              aria-describedby={`${work.video}-description`}
              className="aspect-16/10 object-cover"
            />
            <div className="flex flex-col gap-0.5 text-sm">
              <div className="flex items-center gap-1.5">
                <ExternalLink href={work.href} label={work.title} />
              </div>
              <p id={`${work.video}-description`} className="text-muted-foreground">
                {work.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
