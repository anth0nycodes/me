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
    {
      title: "magic hour (yc w24)",
      role: "software engineer",
      period: "aug 2025 - sep 2025",
      description:
        "polishing more UI and building more ai-powered tools for creators",
      href: "https://magichour.ai",
    },
    {
      title: "magic hour (yc w24)",
      role: "software engineer intern",
      period: "mar 2025 - aug 2025",
      description: "polishing UI and building ai-powered tools for creators",
      href: "https://magichour.ai",
    },
    {
      title: "revisiondojo (yc f24)",
      role: "software engineer intern",
      period: "jan 2025 - mar 2025",
      description: "figma stuff + UI polishing",
      href: "https://revisiondojo.com",
    },
    {
      title: "muslim tech collaborative",
      role: "frontend developer",
      period: "dec 2024 - jan 2025",
      description: "revamped and rebuilt the community website",
      href: "https://mtc.so",
    },
  ],
  education: [
    {
      school: "Lehman College",
      href: "https://www.lehman.cuny.edu/",
      degree: "B.S. in Computer Science",
      logoUrl: "/lehman.png",
      start: "2025",
      end: "Dropped Out 😎",
    },
    {
      school: "DeWitt Clinton HS",
      href: "https://www.dewittclintonhs.com/",
      degree: "High School Diploma",
      logoUrl: "/clinton.png",
      start: "2021",
      end: "2025",
    },
  ],
  projects: [
    {
      title: "observatory",
      role: "contributor / maintainer",
      description: "open-source project for AI-agent observability",
      href: "https://github.com/The-Context-Company/observatory",
    },
    {
      title: "typescript-oop-guide",
      role: "creator / maintainer",
      description:
        "comprehensive learning guide for OOP in TypeScript with 37 hands-on exercises",
      href: "https://github.com/ah-materials/typescript-oop-guide",
    },
    {
      title: "muslim tech collaborative",
      role: "creator / maintainer",
      description:
        "community website for muslims interested in tech. 30+ universities involved",
      href: "https://mtc.so",
    },
  ],
} as const;
