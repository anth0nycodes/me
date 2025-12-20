export const DATA = {
  name: "Anthony Hoang",
  initials: "AH",
  url: "https://anthonyhoang.dev",
  location: "nyc",
  occupation: "Design Engineer",
  locationLink: "https://www.google.com/maps/place/bronx",
  description:
    "design engineer. part-time linkedin warrior. i love building things that look nice.",
  summary:
    "hey — my name is Anthony Hoang and I'm based in NYC. I like creating cool things and learning new things. Whenever I'm not coding, I'm either spending time with loved ones, consuming gym videos, or going to the gym.",
  avatarUrl: "/mepfpupdated.png",
  skills: [
    // Frontend Frameworks & Platforms
    { name: "Next.js", src: "https://nextjs.org/" },
    { name: "React.js", src: "https://react.dev/" },

    // Languages
    { name: "TypeScript", src: "https://www.typescriptlang.org/" },

    // Styling & UI Libraries
    { name: "Tailwind CSS", src: "https://tailwindcss.com/" },
    { name: "Shadcn UI", src: "https://ui.shadcn.com/" },
    { name: "Framer Motion", src: "https://motion.dev/" },

    // Backend Frameworks
    { name: "Express.js", src: "https://expressjs.com/" },
    { name: "Node.js", src: "https://nodejs.org/" },
    { name: "tRPC", src: "https://trpc.io/" },

    // Databases & ORM
    { name: "PostgreSQL", src: "https://www.postgresql.org/" },
    { name: "Drizzle ORM", src: "https://orm.drizzle.team/" },
    { name: "Supabase", src: "https://supabase.com/" },

    // Deployment & Infrastructure
    { name: "Vercel", src: "https://vercel.com/" },

    // Developer Tools
    { name: "Linear", src: "https://linear.app/" },

    // Design Tools
    { name: "Figma", src: "https://www.figma.com/" },
  ],
  resources: [
    {
      title: "Refactoring UI",
      description:
        "learn how to design beautiful user interfaces without relying on a designer",
      author: "Adam W. & Steve S.",
      src: "https://www.refactoringui.com/",
    },
    {
      title: "Flora's Notes on Design Engineering",
      description:
        "thoughtful insights on the intersection of design and engineering",
      author: "Flora G.",
      src: "https://www.floguo.com/notes/design-engineering",
    },
    {
      title: "Design Engineering at Vercel",
      description: "learn what design engineering looks like at vercel",
      author: "Vercel",
      src: "https://vercel.com/blog/design-engineering-at-vercel",
    },
    {
      title: "Web Interface Guidelines",
      description:
        "comprehensive guidelines for building polished web interfaces",
      author: "Vercel",
      src: "https://vercel.com/design/guidelines",
    },
    {
      title: "shadcn",
      description:
        "beautifully designed components that you can copy and paste into your apps",
      author: "Shadab (Shad) A.",
      src: "https://ui.shadcn.com/",
    },
  ],
  work: [
    {
      title: "magic hour (yc w24)",
      role: "software engineer intern ➔ software engineer",
      period: "mar 2025 - sep 2025",
      description:
        "polishing UI and building ai-powered tools for creators — full-time from aug",
      href: "https://magichour.ai",
      image: "/mh.png",
    },
    {
      title: "revisiondojo (yc f24)",
      role: "software engineer intern",
      period: "jan 2025 - mar 2025",
      description: "figma stuff + UI polishing",
      href: "https://revisiondojo.com",
      image: "/rd.png",
    },
    {
      title: "muslim tech collaborative",
      role: "frontend developer",
      period: "dec 2024 - jan 2025",
      description: "revamped and rebuilt the community website",
      href: "https://mtc.so",
      image: "/mtc.png",
    },
  ],
  education: [
    {
      school: "Lehman College",
      href: "https://www.lehman.cuny.edu/",
      degree: "B.S. in Computer Science",
      logoUrl: "/lc.png",
      start: "2025",
      end: "Dropped Out 😎",
    },
    {
      school: "DeWitt Clinton HS",
      href: "https://www.dewittclintonhs.com/",
      degree: "High School Diploma",
      logoUrl: "/dwc.png",
      start: "2021",
      end: "2025",
    },
  ],
  works: [
    {
      title: "design-stuff-01",
      description: "Recreation of Magic UI's animated list",
      href: "https://www.youtube.com/watch?v=rgZ0mqzkr8s",
      thumbnailUrl: "/posters/design-stuff-01.jpg",
    },
    {
      title: "magic-hour-02",
      description: "Landing page I built for Magic Hour",
      href: "https://www.youtube.com/watch?v=zSmqfayeMuQ",
      thumbnailUrl: "/posters/magic-hour-02.jpg",
    },
    {
      title: "magic-hour-01",
      description: "Library page UI work for Magic Hour",
      href: "https://www.youtube.com/watch?v=GQv17nBuV70",
      thumbnailUrl: "/posters/magic-hour-01.jpg",
    },
    {
      title: "mtc",
      description: "Community website I built for Muslim Tech Collaborative",
      href: "https://www.youtube.com/watch?v=rQvx48D8oAc",
      thumbnailUrl: "/posters/mtc-01.jpg",
    },
  ],
  projects: [
    {
      title: "observatory",
      role: "contributor",
      description: "open-source package for AI-agent observability",
      href: "https://github.com/The-Context-Company/observatory/commits/main/?author=anth0nycodes",
      image: "/ob.png",
    },
    {
      title: "typescript-oop-guide",
      role: "creator / maintainer",
      description:
        "comprehensive learning guide for OOP in TypeScript with 37 hands-on exercises",
      href: "https://github.com/ah-materials/typescript-oop-guide",
      image: "/ts.png",
    },
  ],
} as const;
