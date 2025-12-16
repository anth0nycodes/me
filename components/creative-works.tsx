"use client";

import { DATA } from "@/data/me";
import { useEffect, useRef } from "react";

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
            <AutoPlayVideo webmSrc={item.webmSrc} mp4Src={item.mp4Src} />
            <span className="select-none font-mono z-20 absolute bottom-3 bg-background rounded-sm left-3 text-[10px] py-0.5 px-1">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

interface AutoPlayVideoProps {
  webmSrc: string;
  mp4Src: string;
}

function AutoPlayVideo({ webmSrc, mp4Src }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting ? video.play().catch(() => {}) : video.pause();
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="metadata"
      className="w-full rounded-lg"
    >
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
    </video>
  );
}
