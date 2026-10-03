import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** "split" puts the description to the right of the title on wide screens. */
  layout?: "stacked" | "split";
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  layout = "stacked",
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex gap-5",
        layout === "split" ? "flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-16" : "flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className={cn("flex max-w-3xl flex-col gap-4", align === "center" && "items-center")}>
        {eyebrow && <span className={cn("eyebrow", dark ? "text-leaf" : "text-forest")}>{eyebrow}</span>}
        <h2 className={cn("text-display-lg text-balance", dark ? "text-white" : "text-ink")}>{title}</h2>
      </div>
      {description && (
        <p
          className={cn(
            "text-[17px] leading-relaxed text-pretty",
            dark ? "text-on-dark" : "text-muted",
            layout === "split" ? "max-w-md" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
