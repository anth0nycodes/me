export const DATA = {
  name: "Anthony Hoang",
  initials: "AH",
  url: "https://anthonyhoang.dev",
  location: "nyc",
  occupation: "Fullstack Engineer",
  locationLink: "https://www.google.com/maps/place/bronx",
  description:
    "fullstack engineer. professional doomscroller. i love building things that feel and look nice.",
  summary:
    "hey — my name is Anthony Hoang and I'm based in NYC. I like creating cool things and learning new things. Whenever I'm not coding, I'm either spending time with loved ones, consuming gym videos, or going to the gym.",
  images: [
    "/pfp.png",
    "/pfp2.png",
    "/pfp3.png",
    "/pfp4.jpg",
    "/pfp5.jpg",
    "/pfp6.png",
  ],
  avatarUrl: "/pfp.png",
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
    { name: "Prisma", src: "https://www.prisma.io/" },
    { name: "Drizzle", src: "https://orm.drizzle.team/" },
    { name: "Supabase", src: "https://supabase.com/" },

    // Testing
    { name: "Vitest", src: "https://vitest.dev/" },
    { name: "Jest", src: "https://jestjs.io/" },

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
      title: "Web Interface Guidelines",
      description:
        "comprehensive guidelines for building polished web interfaces",
      author: "Vercel",
      src: "https://vercel.com/design/guidelines",
    },
    {
      title: "Fonts Knowledge",
      description: "a library of original guides to the world of typography",
      author: "Google",
      src: "https://fonts.google.com/knowledge",
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
      title: "shadcn",
      description:
        "beautifully designed components that you can copy and paste into your apps",
      author: "Shadab (Shad) A.",
      src: "https://ui.shadcn.com/",
    },
  ],
  work: [
    {
      title: "deep24 (yc w24)",
      role: "software engineer intern",
      period: "mar 2026 - apr 2026",
      description: "helping students get jobs",
      href: "https://deep24.com",
      image: "/d24.png",
    },
    {
      title: "magic hour (yc w24)",
      role: "software engineer intern",
      period: "mar 2025 - sep 2025",
      description: "polishing UI/UX and building ai-powered tools for creators",
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
  creativeWorks: [
    {
      title: "deep24-01",
      description: "Landing page I built for Deep24",
      href: "https://www.youtube.com/watch?v=0BPYzD_GVNI",
      image: "/posters/deep24-01.jpg",
    },
    {
      title: "design-stuff-01",
      description: "Recreation of Magic UI's animated list",
      href: "https://www.youtube.com/watch?v=rgZ0mqzkr8s",
      image: "/posters/design-stuff-01.jpg",
    },
    {
      title: "magic-hour-02",
      description: "Landing page I built for Magic Hour",
      href: "https://www.youtube.com/watch?v=zSmqfayeMuQ",
      image: "/posters/magic-hour-02.jpg",
    },
    {
      title: "magic-hour-01",
      description: "Library page UI work for Magic Hour",
      href: "https://www.youtube.com/watch?v=GQv17nBuV70",
      image: "/posters/magic-hour-01.jpg",
    },
    {
      title: "mtc",
      description: "Community website I built for Muslim Tech Collaborative",
      href: "https://www.youtube.com/watch?v=rQvx48D8oAc",
      image: "/posters/mtc-01.jpg",
    },
  ],
  projects: [
    {
      title: "recall",
      role: "creator / maintainer",
      primary: true,
      status: "in development",
      techStack: [
        "Electron.js",
        "React.js",
        "TypeScript",
        "OpenRouter SDK",
        "SQLite",
        "Drizzle ORM",
        "Shadcn UI",
      ],
      description: "a better way to index and search your iMessage history",
      projectHref: "https://tryrecall.app/",
      sourceCodeHref: "https://github.com/anth0nycodes/recall",
      image: "/posters/recall.png",
    },
    {
      title: "resume-analyzer",
      role: "creator / maintainer",
      primary: true,
      status: "released",
      techStack: [
        "TypeScript",
        "Node.js",
        "Vercel AI SDK",
        "Commander.js",
        "Clack",
        "Zod",
      ],
      description:
        "open-source AI CLI tool that analyzes your resume against a job description and scores how well they match",
      projectHref:
        "https://www.npmjs.com/package/@anth0nycodes/resume-analyzer",
      sourceCodeHref: "https://github.com/anth0nycodes/resume-analyzer",
      image: "/posters/resume-analyzer.png",
    },
    {
      title: "tracemark",
      role: "creator / maintainer",
      primary: true,
      status: "released",
      techStack: ["React.js", "TypeScript", "Fabric.js", "WXT", "Shadcn UI"],
      description:
        "chrome extension that lets you markup/annotate any webpage and copy/export the result as an image",
      projectHref: "https://tracemark.fun/",
      sourceCodeHref: "https://github.com/anth0nycodes/tracemark",
      image: "/posters/tracemark.png",
    },
    {
      title: "mm2-item-info",
      role: "creator / maintainer",
      primary: false,
      status: "released",
      techStack: ["TypeScript", "Node.js", "Commander.js", "Clack"],
      description:
        "open-source CLI tool that returns you the information of a weapon/pet/misc item in Murder Mystery 2",
      projectHref: "https://www.npmjs.com/package/@anth0nycodes/mm2-item-info",
      sourceCodeHref: "https://github.com/anth0nycodes/mm2-item-info",
      image: "/posters/mm2-item-info.png",
    },
    {
      title: "fabric-history",
      role: "creator / maintainer",
      primary: false,
      status: "released",
      techStack: ["TypeScript", "Vitest"],
      description:
        "a library built on top of Fabric.js that adds undo/redo functionality + canvas state history",
      projectHref: "https://www.npmjs.com/package/@anth0nycodes/fabric-history",
      sourceCodeHref: "https://github.com/anth0nycodes/fabric-history",
      image: "/posters/fabric-history.png",
    },
    {
      title: "license-generator",
      role: "creator / maintainer",
      primary: false,
      status: "released",
      techStack: ["TypeScript", "Node.js", "Commander.js", "Clack"],
      description:
        "open-source CLI tool that generates licenses for your repositories",
      projectHref:
        "https://www.npmjs.com/package/@anth0nycodes/license-generator",
      sourceCodeHref: "https://github.com/anth0nycodes/license-generator",
      image: "/posters/license-generator.png",
    },
    // {
    //   title: "observatory",
    //   role: "contributor",
    //   description: "open-source package for AI-agent observability",
    //   href: "https://github.com/The-Context-Company/observatory/commits/main/?author=anth0nycodes",
    //   image: "/ob.png",
    // },
    // {
    //   title: "typescript-oop-guide",
    //   role: "creator / maintainer",
    //   description:
    //     "comprehensive learning guide for OOP in TypeScript with 37 hands-on exercises",
    //   href: "https://github.com/ah-materials/typescript-oop-guide",
    //   image: "/ts.png",
    // },
  ],
} as const;
