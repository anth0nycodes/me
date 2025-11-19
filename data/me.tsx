import { Icons } from "@/components/icons";
import { HomeIcon, BrainIcon } from "lucide-react";

export const DATA = {
  name: "Anthony Hoang",
  initials: "AH",
  url: "https://anthonyhoang.dev",
  location: "nyc",
  occupation: "Fullstack Engineer",
  locationLink: "https://www.google.com/maps/place/bronx",
  description:
    "Software Engineer. Part-time LinkedIn warrior. I love building cool things.",
  summary:
    "Hi, my name is Anthony Hoang and I'm based in NYC. I like creating cool things and learning new things.",
  avatarUrl: "/mepfpupdated.png",
  skills: [
    // Frontend Frameworks & Platforms
    { name: "Next.js", src: "https://nextjs.org/" },
    { name: "React.js", src: "https://react.dev/" },
    { name: "React Native", src: "https://reactnative.dev/" },
    { name: "Expo", src: "https://expo.dev/" },

    // Languages
    { name: "TypeScript", src: "https://www.typescriptlang.org/" },
    { name: "Node.js", src: "https://nodejs.org/" },

    // Backend Frameworks
    { name: "Express.js", src: "https://expressjs.com/" },
    { name: "tRPC", src: "https://trpc.io/" },

    // Databases & ORM
    { name: "PostgreSQL", src: "https://www.postgresql.org/" },
    { name: "Drizzle ORM", src: "https://orm.drizzle.team/" },
    { name: "Supabase", src: "https://supabase.com/" },

    // Validation & Schema
    { name: "Zod", src: "https://zod.dev/" },

    // Styling & UI Libraries
    { name: "Tailwind CSS", src: "https://tailwindcss.com/" },
    { name: "Shadcn UI", src: "https://ui.shadcn.com/" },

    // AI / SDKs
    { name: "Vercel AI SDK", src: "https://sdk.vercel.ai/" },
    { name: "OpenAI API", src: "https://platform.openai.com/docs/" },

    // Deployment & Infrastructure
    { name: "Vercel", src: "https://vercel.com/" },

    // Developer Tools
    { name: "Git", src: "https://git-scm.com/" },
    { name: "Vite", src: "https://vitejs.dev/" },
    { name: "Linear", src: "https://linear.app/" },

    // Design Tools
    { name: "Figma", src: "https://www.figma.com/" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/thoughts", icon: BrainIcon, label: "Thoughts" },
  ],
  contact: {
    email: "hoanganthony2207@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/anth0nycodes",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/anth0nycodes/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/anth0nycodes",
        icon: Icons.x,
        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "mailto:hoanganthony2207@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    // {
    //   company: "Performant",
    //   href: "https://performant.framer.website",
    //   title: "Co-Founder",
    //   logoUrl: "/performant-logo.png",
    //   start: "October 2025",
    //   end: "Present",
    // },
    {
      company: "Magic Hour (YC W24)",
      href: "https://magichour.ai",
      title: "Software Engineer",
      logoUrl: "/magichour.png",
      start: "August 2025",
      end: "September 2025",
    },
    {
      company: "Magic Hour (YC W24)",
      href: "https://magichour.ai",
      title: "Software Engineer Intern",
      logoUrl: "/magichour.png",
      start: "March 2025",
      end: "August 2025",
    },
    {
      company: "RevisionDojo (YC F24)",
      href: "https://revisiondojo.com",
      title: "Software Engineer Intern",
      logoUrl: "/revisiondojo.png",
      start: "January 2025",
      end: "March 2025",
    },
    {
      company: "Muslim Tech Collaborative",
      href: "https://mtc.so/",
      title: "Frontend Developer",
      logoUrl: "/mtc.png",
      start: "December 2024",
      end: "January 2025",
    },
  ],
  education: [
    {
      school: "Lehman College",
      href: "https://www.lehman.cuny.edu/",
      degree: "Bachelor's Degree of Computer Science (BS)",
      logoUrl: "/lehman.png",
      start: "2025",
      end: "Dropped Out 😎",
    },
    {
      school: "DeWitt Clinton High School",
      href: "https://www.dewittclintonhs.com/",
      degree: "High School Diploma",
      logoUrl: "/clinton.png",
      start: "2021",
      end: "2025",
    },
  ],
  projects: [
    // {
    //   title: "Performant",
    //   href: "https://performant.framer.website",
    //   dates: "Oct 2025 - Present",
    //   description: "Your personalized health OS.",
    //   technologies: [
    //     "Next.js",
    //     "TypeScript",
    //     "React Native",
    //     "Expo",
    //     "PostgreSQL",
    //     "SQLite",
    //     "Express.js",
    //     "Tailwind CSS",
    //     "Drizzle ORM",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://performant.framer.website",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //   ],
    //   image: "/performant-thumbnail.png",
    // },
    {
      title: "AI Meme Generator",
      href: "https://magichour.ai/products/ai-meme-generator",
      dates: "April 2025",
      active: false,
      description: "Turn your topics into memes within a few seconds with AI.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Python",
        "OpenAI API",
        "Tailwind CSS",
        "Zod",
      ],
      links: [
        {
          type: "Website",
          href: "https://magichour.ai/products/ai-meme-generator",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/memegenerator.png",
    },
    {
      title: "Muslim Tech Collaborative",
      href: "https://muslimtech.org/",
      dates: "January 2025",
      active: false,
      description:
        "Built a website for Muslim Tech Collaborative to help them showcase their projects and events.",
      technologies: [
        "Next.js",
        "JavaScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Figma",
      ],
      links: [
        {
          type: "Website",
          href: "https://muslimtech.org/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/mtcwebsite.png",
    },
  ],
} as const;
