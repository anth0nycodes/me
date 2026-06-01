export const DATA = {
  name: "Anthony Hoang",
  initials: "AH",
  url: "https://anthonyhoang.dev",
  location: "nyc",
  occupation: "Roblox Game Developer",
  locationLink: "https://www.google.com/maps/place/bronx",
  description:
    "roblox game developer. professional doomscroller. i love building games that feel fun and look great.",
  summary:
    "hey — my name is Anthony Hoang and I'm based in NYC. I like creating cool things and learning new things. Whenever I'm not coding, I'm either spending time with loved ones, consuming gym videos, or going to the gym.",
  avatarUrl: "/pfp.png",
  skills: [
    // Languages
    { name: "Luau", src: "https://luau-lang.org/" },
    { name: "Lua", src: "https://www.lua.org/" },
    { name: "TypeScript", src: "https://www.typescriptlang.org/" },

    // Game Development
    { name: "Roblox Studio", src: "https://create.roblox.com/" },
    { name: "Wally", src: "https://wally.run/" },
    { name: "Rojo", src: "https://rojo.space/" },

    // 3D & Design
    { name: "Blender", src: "https://www.blender.org/" },
    { name: "Figma", src: "https://www.figma.com/" },

    // Web Development
    { name: "Next.js", src: "https://nextjs.org/" },
    { name: "React.js", src: "https://react.dev/" },
    { name: "Tailwind CSS", src: "https://tailwindcss.com/" },
    { name: "Shadcn UI", src: "https://ui.shadcn.com/" },
  ],
  resources: [
    {
      title: "Roblox Creator Documentation",
      description:
        "official docs for building experiences on roblox — scripting, UI, physics, and more",
      author: "Roblox",
      src: "https://create.roblox.com/docs",
    },
    {
      title: "Luau Language Reference",
      description:
        "complete reference for Luau, Roblox's scripting language derived from Lua",
      author: "Roblox",
      src: "https://luau-lang.org/",
    },
    {
      title: "DevForum",
      description:
        "roblox's official developer forum — tutorials, resources, and community help",
      author: "Roblox",
      src: "https://devforum.roblox.com/",
    },
    {
      title: "Blender Guru",
      description:
        "learn 3D modeling and design with one of the best blender tutorial creators",
      author: "Andrew Price",
      src: "https://www.youtube.com/@blenderguru",
    },
    {
      title: "Wally",
      description:
        "package manager for roblox — manage dependencies for your projects",
      author: "UpliftGames",
      src: "https://wally.run/",
    },
    {
      title: "Rojo",
      description:
        "bridge between your filesystem and roblox studio — enables professional workflows",
      author: "Rojo",
      src: "https://rojo.space/",
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
  projects: [
    {
      title: "combat-testing",
      role: "creator",
      description:
        "a basic combat system in roblox — building out core fighting mechanics",
      href: "https://github.com/anth0nycodes/combat-testing",
      image: "/posters/combat-testing.png",
    },
  ],
} as const;
