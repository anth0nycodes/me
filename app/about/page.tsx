import { Metadata } from "next";
import Link from "next/link";
import { AvatarShuffle } from "@/components/about/avatar-shuffle";
import { FoodCarousel } from "@/components/about/food-carousel";
import { Stamp } from "@/components/about/stamp";
import { DATA } from "@/data/me";

export const metadata: Metadata = {
  title: "About",
  description: `${DATA.name}, a product designer in ${DATA.location}.`,
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 pt-14 lg:px-[5vw]">
      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] xl:gap-16">
        {/* the bio, then the experience list under it */}
        <div className="flex flex-col gap-20">
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <AvatarShuffle />
              <div className="flex flex-col gap-0.5">
                <h1 className="font-medium">{DATA.name}</h1>
                <p className="text-muted-foreground text-sm">
                  {DATA.occupation} · {DATA.location}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 leading-relaxed">
              <p>
                Hey, I&apos;m {DATA.name.split(" ")[0]} — a product designer in
                NYC who enjoys designing interfaces that feel as good as they
                look. I&apos;ve always found it so cool how you can create
                anything you imagine with enough time, effort, and a bit of
                caffeine 😂
              </p>
              <p>
                Previously, I interned at{" "}
                <a
                  href="https://magichour.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Magic Hour
                </a>{" "}
                and{" "}
                <a
                  href="https://deep24.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Deep24
                </a>
                , shipping user-facing features. On the side, I made Tracemark,
                a Chrome extension for marking up any website. You can read how
                it came together in its{" "}
                <Link
                  href="/case-studies/tracemark"
                  className="underline underline-offset-4"
                >
                  case study
                </Link>
                .
              </p>
              <p>
                When I&apos;m not designing, I&apos;m usually doomscrolling,
                lying in bed, or doing both simultaneously 😅
              </p>
            </div>
          </section>
          <section
            aria-labelledby="experience-heading"
            className="flex flex-col gap-4"
          >
            <h2 id="experience-heading" className="text-sm">
              — Experience
            </h2>
            <ul className="divide-separator flex flex-col divide-y">
              {DATA.work.map((job) => (
                <li
                  key={job.title}
                  className="flex items-baseline justify-between gap-4 py-3 text-sm"
                >
                  <div className="flex flex-col gap-0.5">
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-muted-foreground font-medium transition-colors"
                    >
                      {job.title}
                    </a>
                    <span className="text-muted-foreground capitalize">
                      {job.role}
                    </span>
                  </div>
                  <span className="text-muted-foreground shrink-0 tabular-nums">
                    {job.period}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        {/* two stamps dropped on the page, lower right beside the experience list: the setup tilted
            one way, me the other, overlapping */}
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[28rem] sm:max-w-[34rem] lg:mt-48 lg:mr-0 lg:ml-auto lg:aspect-[16/10] lg:max-w-[42rem]">
          <Stamp
            src="/about/setup"
            alt="My desk: a monitor with a light bar showing Figma, a cream keyboard, and a row of anime figures"
            width={960}
            height={720}
            caption="The setup · my bedroom"
            tilt={-5}
            className="absolute top-[4%] left-0 w-[64%] lg:top-0 lg:w-[58%]"
          />
          <Stamp
            src="/about/me"
            alt="Me in a store trying on a VR headset, in a brown tee and denim shorts"
            width={720}
            height={960}
            caption="Me, testing gadgets"
            tilt={6}
            className="absolute right-[2%] bottom-[2%] w-[40%] lg:right-[4%] lg:bottom-0 lg:w-[34%]"
          />
        </div>
      </div>
      <section aria-labelledby="foodie-heading">
        <FoodCarousel
          labelledBy="foodie-heading"
          heading={
            <h2 id="foodie-heading" className="text-sm">
              — I&apos;m also a huge foodie
            </h2>
          }
        />
      </section>
    </div>
  );
}
