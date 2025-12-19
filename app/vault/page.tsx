import { VaultCard } from "@/components/vault-card";
import { DATA } from "@/data/me";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vault",
  description: "My collection of favorite resources.",
};

export default async function ThoughtsPage() {
  return (
    <section className="flex flex-col gap-8">
      <h1 className="lowercase text-3xl tracking-tighter font-medium">
        <span className="inline-flex gap-3 items-center">
          🔒
          <span>welcome to my vault</span>
        </span>
      </h1>
      <div className="flex flex-col gap-6">
        <p>
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
