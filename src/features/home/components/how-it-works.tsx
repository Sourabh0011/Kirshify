import { ArrowRight, RefreshCw } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";

import { cycleSteps } from "../content";

export function HowItWorks() {
  return (
    <Section>
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-14">
        <div className="flex flex-col gap-4">
          <span className="eyebrow text-forest">Simple steps</span>
          <h2 className="text-display-lg">How Kirshify works</h2>
          <p className="text-[17px] leading-relaxed text-muted">
            From onboarding to harvest — one continuous cycle for better earnings and smarter farming.
          </p>
          <ButtonLink href="/sell" className="mt-2 self-start">
            Join now <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <ol className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
          {cycleSteps.map((step, i) => {
            const last = i === cycleSteps.length - 1;
            return (
              <li key={step.title} className="flex flex-col gap-3.5 rounded-3xl border border-line-soft bg-mist p-5">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex size-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-extrabold",
                      last ? "bg-marigold text-ink" : "bg-forest text-white",
                    )}
                  >
                    {i + 1}
                  </span>
                  {last ? (
                    <RefreshCw className="size-6 text-marigold-ink" aria-label="The cycle repeats" />
                  ) : (
                    <span aria-hidden="true" className="h-0 flex-1 border-t-[1.5px] border-dashed border-line" />
                  )}
                </div>
                <span className="text-lg font-extrabold">{step.title}</span>
                <span className="text-[14.5px] leading-normal text-muted">{step.body}</span>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
