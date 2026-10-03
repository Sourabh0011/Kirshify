import { cn, initials } from "@/lib/utils";

const palettes = [
  "bg-marigold text-ink",
  "bg-leaf-soft text-forest",
  "bg-sky-soft text-sky-ink",
  "bg-rose-soft text-rose-ink",
  "bg-plum-soft text-plum-ink",
];

export function Avatar({ name, size = "md", className }: { name: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const palette = palettes[name.length % palettes.length];
  const sizes = { sm: "size-9 text-xs", md: "size-11 text-sm", lg: "size-16 text-lg" };
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-extrabold", palette, sizes[size], className)}
    >
      {initials(name)}
    </span>
  );
}
