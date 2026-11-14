import { Metadata } from "next";
import { VaultCard } from "@/components/vault/vault-card";
import { DATA } from "@/data/me";

export const metadata: Metadata = {
  title: "Vault",
  description: "My collection of favorite resources.",
};

export default async function ThoughtsPage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-muted-foreground dark:text-foreground border-separator border-b pb-2 text-base font-medium capitalize">
        <span>
          vault
          <sup className="text-muted-foreground ml-1.5 text-xs select-none">
            ({DATA.resources.length})
          </sup>
        </span>
      </h1>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
