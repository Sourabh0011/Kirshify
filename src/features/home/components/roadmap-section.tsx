import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

import { roadmap } from "../content";

export function RoadmapSection() {
  return (
    <Section tone="sage">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Rollout" title="From three districts to the whole country — led by FPOs." />
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {roadmap.map((phase, i) => {
            const current = i === 0;
            return (
              <li
                key={phase.phase}
                className={cn("flex flex-col gap-4 rounded-[26px] p-7", current ? "bg-forest text-white" : "bg-white")}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("eyebrow", current ? "text-leaf" : "text-forest")}>{phase.phase}</span>
                  <span className={cn("rounded-full px-2.5 py-1 text-xs font-extrabold", current ? "bg-leaf text-ink" : "bg-sage text-forest")}>
                    {phase.badge}
                  </span>
                </div>
                <h3 className="font-display text-[28px] font-bold tracking-tight">{phase.title}</h3>
                <p className={cn("leading-relaxed", current ? "text-on-dark" : "text-muted")}>{phase.body}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
