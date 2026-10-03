import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type BadgeTone = "leaf" | "sage" | "forest" | "accent" | "marigold" | "sky" | "neutral" | "danger" | "glass";

const tones: Record<BadgeTone, string> = {
  leaf: "bg-leaf-soft text-forest",
  sage: "bg-sage text-forest",
  forest: "bg-forest text-white",
  accent: "bg-leaf text-ink",
  marigold: "bg-marigold-soft text-marigold-ink",
  sky: "bg-sky-soft text-sky-ink",
  neutral: "bg-mist text-muted",
  danger: "bg-danger-soft text-danger",
  glass: "bg-ink/70 text-white backdrop-blur",
};

export function Badge({ tone = "leaf", className, ...props }: ComponentProps<"span"> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold", tones[tone], className)}
      {...props}
    />
  );
}
