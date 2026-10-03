import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10", className)} {...props} />;
}

type SectionProps = ComponentProps<"section"> & { tone?: "white" | "sage" | "mist" | "deep" };

const tones = {
  white: "bg-white",
  sage: "bg-sage",
  mist: "bg-mist",
  deep: "bg-deep text-white",
};

export function Section({ tone = "white", className, ...props }: SectionProps) {
  return <section className={cn("py-18 sm:py-24 lg:py-28", tones[tone], className)} {...props} />;
}
