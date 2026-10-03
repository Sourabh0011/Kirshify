"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  CloudSun,
  IndianRupee,
  Mic,
  ScanLine,
  ShoppingBag,
  Tractor,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { IconTile, type IconTone } from "@/components/ui/icon-tile";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { useAdvisor } from "@/providers/advisor-provider";

import { pillars, type PillarId } from "../content";
import { FeaturePreview } from "./feature-previews";

type Pillar = (typeof pillars)[number];

const pillarIcons: Record<PillarId, { icon: LucideIcon; tone: IconTone }> = {
  marketplace: { icon: ShoppingBag, tone: "marigold" },
  doctor: { icon: ScanLine, tone: "mint" },
  mandi: { icon: IndianRupee, tone: "sky" },
  advisor: { icon: Mic, tone: "plum" },
  pooling: { icon: Tractor, tone: "rose" },
  weather: { icon: CloudSun, tone: "leaf" },
};

/** Sticky header height + breathing room, used when scrolling an opened card into view. */
const HEADER_OFFSET = 96;

export function FeaturesSection() {
  // Desktop tabs always show one feature. The mobile accordion starts collapsed so all six fit on one screen.
  const [active, setActive] = useState<PillarId>("marketplace");
  const [open, setOpen] = useState<PillarId | null>(null);
  const itemRefs = useRef<Partial<Record<PillarId, HTMLDivElement | null>>>({});
  const pillar = pillars.find((p) => p.id === active)!;

  function toggle(id: PillarId) {
    const next = open === id ? null : id;
    setOpen(next);
    if (!next) return;
    setActive(next);
    // Closing the card above shifts this one upward — keep its header in view.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const el = itemRefs.current[id];
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top < HEADER_OFFSET || top > window.innerHeight * 0.55) {
          window.scrollTo({ top: window.scrollY + top - HEADER_OFFSET, behavior: "smooth" });
        }
      }),
    );
  }

  return (
    <Section id="features" tone="sage">
      <Container className="flex flex-col gap-8 sm:gap-12">
        <SectionHeading
          layout="split"
          eyebrow="All features"
          title="Six tools. One app, from seed to sale."
          description="Tap a feature to see it in action. Everything a grower needs to plan, protect, price and sell a crop."
        />

        {/* Phones & tablets: accordion — every tool visible, details open in place. */}
        <div className="flex flex-col gap-3 lg:hidden">
          {pillars.map((p) => {
            const isOpen = open === p.id;
            const { icon, tone } = pillarIcons[p.id];
            return (
              <div
                key={p.id}
                ref={(el) => {
                  itemRefs.current[p.id] = el;
                }}
                className={cn(
                  "overflow-hidden rounded-[22px] border bg-white transition-shadow",
                  isOpen ? "border-forest shadow-card" : "border-line",
                )}
              >
                <h3>
                  <button
                    type="button"
                    id={`feature-${p.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`feature-panel-${p.id}`}
                    onClick={() => toggle(p.id)}
                    className="flex min-h-[72px] w-full items-center gap-3 px-3.5 py-3.5 text-left"
                  >
                    <IconTile icon={icon} tone={tone} size="sm" />
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-[15.5px] leading-snug font-extrabold">{p.title}</span>
                      <span className="text-[13.5px] leading-snug text-muted">{p.blurb}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-[transform,background-color]",
                        isOpen ? "rotate-180 bg-forest text-white" : "bg-sage text-forest",
                      )}
                    >
                      <ChevronDown className="size-5" strokeWidth={2.2} />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={`feature-panel-${p.id}`}
                    role="region"
                    aria-labelledby={`feature-${p.id}`}
                    className="flex animate-reveal flex-col gap-5 border-t border-line-soft px-4 pt-5 pb-5 sm:px-6 sm:pb-6"
                  >
                    <PillarCopy pillar={p} compact />
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <FeaturePreview id={p.id} />
                    </div>
                    <PillarCta pillar={p} className="w-full sm:w-auto sm:self-start" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: tab list + large preview panel. */}
        <div className="hidden gap-6 lg:flex">
          <div role="tablist" aria-label="Kirshify features" aria-orientation="vertical" className="flex w-[360px] shrink-0 flex-col gap-2.5">
            {pillars.map((p) => {
              const selected = p.id === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${p.id}`}
                  onClick={() => {
                    setActive(p.id);
                    setOpen(p.id);
                  }}
                  className={cn(
                    "flex min-h-[78px] items-center gap-4 rounded-[18px] border px-4 py-3 text-left transition-shadow hover:shadow-[0_0_0_2px_var(--color-forest)]",
                    selected ? "border-forest bg-forest text-white" : "border-line bg-white text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-ink",
                      selected ? "bg-leaf" : "bg-sage",
                    )}
                  >
                    {p.n}
                  </span>
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="font-extrabold">{p.title}</span>
                    <span className={cn("text-[13.5px]", selected ? "text-on-dark-muted" : "text-muted")}>{p.blurb}</span>
                  </span>
                  <ChevronRight className={cn("size-[18px] shrink-0", !selected && "opacity-35")} strokeWidth={2.2} />
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${pillar.id}`}
            aria-labelledby={`tab-${pillar.id}`}
            className="flex min-w-0 flex-1 gap-8 rounded-[28px] border border-line bg-white p-11"
          >
            <div className="flex flex-1 flex-col gap-5">
              <PillarCopy pillar={pillar} />
              <PillarCta pillar={pillar} className="mt-auto self-start" />
            </div>
            <div className="w-[46%] shrink-0">
              <FeaturePreview id={pillar.id} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PillarCopy({ pillar, compact = false }: { pillar: Pillar; compact?: boolean }) {
  return (
    <>
      {!compact && (
        <span className="self-start rounded-full bg-sage px-3 py-1.5 text-[13px] font-extrabold text-forest">
          {pillar.n} · {pillar.tag}
        </span>
      )}
      {compact ? (
        <p className="font-display text-[22px] leading-tight font-bold tracking-tight text-balance">{pillar.heading}</p>
      ) : (
        <h3 className="text-display-md">{pillar.heading}</h3>
      )}
      <p className="leading-relaxed text-muted">{pillar.description}</p>
      <ul className="flex flex-col gap-3">
        {pillar.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-[15.5px] leading-normal">
            <span className="mt-0.5 inline-flex size-[22px] shrink-0 items-center justify-center rounded-full bg-leaf-soft text-forest">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {b}
          </li>
        ))}
      </ul>
    </>
  );
}

function PillarCta({ pillar, className }: { pillar: Pillar; className?: string }) {
  const { openAdvisor } = useAdvisor();
  const content = (
    <>
      {pillar.cta.label}
      <ArrowRight className="size-4" />
    </>
  );
  return pillar.cta.advisor ? (
    <Button size="lg" className={className} onClick={() => openAdvisor()}>
      {content}
    </Button>
  ) : (
    <ButtonLink size="lg" href={pillar.cta.href!} className={className}>
      {content}
    </ButtonLink>
  );
}
