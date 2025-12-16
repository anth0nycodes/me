import { DATA } from "@/data/me";

export function CreativeWorks() {
  return (
    <section className="flex min-h-0 flex-col gap-5">
      <h2 className="text-2xl flex items-center gap-3 font-medium">
        <span>🎨</span>
        creative works
      </h2>

      <div className="flex flex-col gap-8">
        {DATA.works.map((item, index) => (
          <div key={index} className="relative">
            <video
              poster={item.poster}
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full rounded-lg"
            >
              <source src={item.webmSrc} type="video/webm" />
              <source src={item.mp4Src} type="video/mp4" />
            </video>
            <span className="select-none font-mono z-20 absolute bottom-3 bg-background rounded-sm left-3 text-[10px] py-0.5 px-1">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
