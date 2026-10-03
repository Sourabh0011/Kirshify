import Link from "next/link";

import { cn } from "@/lib/utils";

export function LogoMark({ size = 36, tone = "forest" }: { size?: number; tone?: "forest" | "dark" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true" className="shrink-0">
      <rect width="36" height="36" rx="10" fill={tone === "forest" ? "#0F4D36" : "#13603F"} />
      <path d="M18 28V16.5" stroke="#A8E05F" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M18 17.5c0-5.2 3.4-8.4 9-8.4 0 5.6-3.5 8.6-9 8.4z" fill="#A8E05F" />
      <path d="M18 21c0-4.2-3-6.8-8-6.8 0 4.6 3 7.1 8 6.8z" fill="#F4A93C" />
    </svg>
  );
}

export function Logo({ tone = "light", className, href = "/" }: { tone?: "light" | "dark"; className?: string; href?: string }) {
  return (
    <Link href={href} aria-label="Kirshify home" className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone === "light" ? "forest" : "dark"} />
      <span
        className={cn(
          "font-display text-2xl font-extrabold tracking-[-0.03em]",
          tone === "light" ? "text-ink" : "text-white",
        )}
      >
        Kirshify
      </span>
    </Link>
  );
}
