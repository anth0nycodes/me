"use client";

import { ArrowUpRight, SquareArrowOutUpRight } from "lucide-react";
import { useSound } from "use-sound";
import { useAudioEnabled } from "@/context/use-audio-enabled";
import { useHaptics } from "@/hooks/use-haptics";

type ConditionalLinkProps =
  | {
      iconOnly: true;
      ariaLabel: string;
      label?: never;
      additionalContext?: never;
    }
  | {
      iconOnly?: false;
      ariaLabel?: never;
      label: string;
      /**
       * Screen-reader-only text read after `label`, e.g. the project title.
       */
      additionalContext?: string;
    };

type ExternalLinkProps = {
  href: string;
} & ConditionalLinkProps;

/**
 * External link that opens in a new tab. Plays a sound and haptic tick when hovered over.
 *
 * Two modes:
 * - **Text** (default): shows `label` with an arrow icon. Pass `additionalContext`
 *   to tell apart links that share a label.
 * - **Icon-only** (`iconOnly`): shows only an icon. `ariaLabel` is required
 *   because there's no visible text.
 *
 * @example
 * <ExternalLink href={repo} label="Source code" additionalContext={project.title} />
 *
 * @example
 * <ExternalLink href={video} iconOnly ariaLabel="Watch Intro on YouTube" />
 */
export function ExternalLink(props: ExternalLinkProps) {
  const { href } = props;
  const { trigger } = useHaptics();
  const { audioEnabled } = useAudioEnabled();
  const [playHoverSFX] = useSound("/audio/hover-tick.wav", {
    volume: 0.125,
    soundEnabled: audioEnabled,
  });

  function handleMouseEnter() {
    trigger("light");
    playHoverSFX();
  }

  if (props.iconOnly) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={props.ariaLabel}
        className="text-muted-foreground hover:text-foreground transition-colors"
        onMouseEnter={handleMouseEnter}
      >
        <SquareArrowOutUpRight className="size-3.5" aria-hidden />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-medium transition-colors sm:text-sm"
      onMouseEnter={handleMouseEnter}
    >
      <span className="group-hover:underline">{props.label}</span>
      {props.additionalContext && <span className="sr-only">, {props.additionalContext}</span>}
      <ArrowUpRight
        className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden
      />
    </a>
  );
}
