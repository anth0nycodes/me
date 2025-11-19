import Link from "next/link";

const links = [
  { title: "github", href: "https://github.com/anth0nycodes" },
  { title: "linkedin", href: "https://www.linkedin.com/in/anth0nycodes" },
  { title: "x", href: "https://x.com/anth0nycodes" },
  { title: "coffee chat ☕️", href: "https://cal.com/anth0nycodes" },
  { title: "email", href: "mailto:hoanganthony2207@gmail.com" },
];

export function LinksSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl flex items-center gap-3 font-medium font-monocraft text-white">
        <span className="text-primary">$</span> you can find me here
      </h2>
      <div className="flex flex-wrap gap-4 text-sm">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            className="text-gray-400 hover:text-primary transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
