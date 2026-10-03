import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type IconTone = "forest" | "leaf" | "marigold" | "sky" | "rose" | "plum" | "mint" | "white" | "accent";

const tones: Record<IconTone, string> = {
  forest: "bg-forest text-white",
  leaf: "bg-leaf-soft text-forest",
  marigold: "bg-marigold-soft text-marigold-ink",
  sky: "bg-sky-soft text-sky-ink",
  rose: "bg-rose-soft text-rose-ink",
  plum: "bg-plum-soft text-plum-ink",
  mint: "bg-mint-soft text-mint-ink",
  white: "bg-white text-forest",
  accent: "bg-leaf text-ink",
};

const sizes = {
  sm: "size-10 rounded-xl [&_svg]:size-5",
  md: "size-12 rounded-2xl [&_svg]:size-6",
  lg: "size-14 rounded-2xl [&_svg]:size-7",
};

export function IconTile({
  icon: Icon,
  tone = "leaf",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: IconTone;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={cn("inline-flex shrink-0 items-center justify-center", tones[tone], sizes[size], className)}>
      <Icon strokeWidth={1.9} />
    </span>
  );
}
