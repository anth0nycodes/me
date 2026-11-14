"use client";

import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { DATA } from "@/data/me";
import { useHaptics } from "@/hooks/use-haptics";

export function ExperienceList() {
  const { trigger } = useHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  return (
    // hovering (or tabbing to) one row dims the rest
    <ul className="divide-separator group/list flex flex-col divide-y">
      {DATA.work.map((job) => (
        <li key={job.title}>
          <a
            href={job.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-baseline justify-between gap-4 py-3 text-sm group-hover/list:opacity-50 group-has-[a:focus-visible]/list:opacity-50 hover:opacity-100 focus-visible:opacity-100"
            onMouseEnter={() => {
              trigger("light");
              playHoverSFX();
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">{job.title}</span>
              <span className="text-muted-foreground capitalize">
                {job.role}
              </span>
            </div>
            <span className="text-muted-foreground shrink-0 tabular-nums">
              {job.period}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
