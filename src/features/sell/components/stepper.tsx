import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Progress">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3 last:flex-none" aria-current={active ? "step" : undefined}>
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
                  done && "bg-forest text-white",
                  active && "bg-forest text-white ring-4 ring-leaf-soft",
                  !done && !active && "border border-line bg-white text-muted",
                )}
              >
                {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
              </span>
              <span className={cn("hidden text-sm font-bold whitespace-nowrap md:inline", active ? "text-ink" : "text-muted")}>{label}</span>
            </span>
            {i < steps.length - 1 && <span aria-hidden="true" className={cn("h-0.5 flex-1 rounded-full", done ? "bg-forest" : "bg-line")} />}
          </li>
        );
      })}
    </ol>
  );
}
