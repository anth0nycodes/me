import { VaultCard } from "@/components/vault-card";
import { DATA } from "@/data/me";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vault",
  description: "My collection of favorite resources.",
};

export default async function ThoughtsPage() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="lowercase border-b pb-2 border-[#222222] text-base font-medium">
        <span>
          welcome to my vault
          <sup className="ml-1.5 select-none text-muted-foreground text-xs">
            ({DATA.resources.length})
          </sup>
        </span>
      </h1>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          below are some of my favorite resources! i&apos;ll continually add to
          this list as i find more gems :)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DATA.resources.map((item) => (
            <VaultCard
              key={item.title}
              title={item.title}
              src={item.src}
              description={item.description}
              author={item.author}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
