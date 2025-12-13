import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

interface ReviewCardProps {
  name: string;
  role: string;
  body: string;
  src: string;
}

const reviews = [
  {
    name: "Runbo Li",
    role: "CEO @ Magic Hour (YC W24)",
    body: "Anthony interned at Magic Hour on our web engineering team, and later transitioned to full-time contractor, where he shipped redesigns to several of our top pages with care and attention to detail. What stood out was his eagerness to learn and how quickly he absorbed feedback. Beyond engineering, he brought positive energy to the team, organizing an event as our community manager and contributing to content marketing, winning our first Linkedin competition. Anthony has a unique mix of technical ability and creativity, and I'm excited to see where he takes it next.",
    src: "/runbo.png",
  },
  {
    name: "Simon Xu",
    role: "SWE @ Magic Hour (YC W24)",
    body: "I've worked with Anthony for over a year at Magic Hour and other projects. I can confidently say with certainty that he's a brilliantly dedicated software engineer. He's always eager to learn and lend a helping hand to other software engineers. Anthony collaborates extremely well - it was a joy to work with him on projects. I highly recommend Anthony, he's amazing to have on a team.",
    src: "/simon.png",
  },
  {
    name: "Andrew Miller",
    role: "SWE @ Magic Hour (YC W24)",
    body: "Anthony brought both technical skill and great energy to our projects at Magic Hour. He led key projects such as our new landing page and AI meme generator, and also went out of his way to help others ramp up quickly. He’s the kind of engineer who elevates the entire team. I would highly recommend him for any engineering role.",
    src: "/andrew.png",
  },
];

const ReviewCard = ({ name, role, body, src }: ReviewCardProps) => {
  return (
    <figure className="relative size-full max-w-sm cursor-pointer overflow-hidden rounded-xl border border-gray-400 p-4">
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt={`Testimonial from ${name}`}
          src={src}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{role}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm normal-case">{body}</blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <div className="flex min-h-0 flex-col gap-5">
      <h2 className="text-2xl flex items-center gap-3 font-medium font-monocraft text-white">
        <span className="text-primary">$</span> cool people said
      </h2>
      <div className="relative flex w-full flex-col justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s]">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    </div>
  );
}
