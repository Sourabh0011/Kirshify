"use client";

import { ChevronLeft, ChevronRight, IndianRupee, Leaf, Quote, Scale, TrendingUp, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { cn } from "@/lib/utils";

import { sampleTestimonials } from "../content";

const impact: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: TrendingUp, value: "35–40%", label: "Higher farmer income" },
  { icon: IndianRupee, value: "1%", label: "Fee, only on closed trades" },
  { icon: Scale, value: "Same price", label: "Visible to farmer and buyer" },
  { icon: Leaf, value: "Organic-first", label: "Remedies for healthier soil" },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = sampleTestimonials[index];
  const go = (delta: number) => setIndex((i) => (i + delta + sampleTestimonials.length) % sampleTestimonials.length);

  return (
    <Section>
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="eyebrow text-forest">Real impact</span>
            <h2 className="text-display-lg">Farmers. Consumers. A stronger future.</h2>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-7">
            {impact.map((s) => (
              <li key={s.label} className="flex items-start gap-3.5">
                <IconTile icon={s.icon} tone="leaf" size="sm" />
                <span className="flex flex-col">
                  <span className="font-display text-2xl font-extrabold tracking-tight">{s.value}</span>
                  <span className="text-[13.5px] text-muted">{s.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative flex flex-col gap-6 rounded-[28px] border border-line-soft bg-mist p-6 sm:p-9" aria-roledescription="carousel">
          <div className="flex items-center justify-between">
            <Quote className="size-9 text-leaf" fill="currentColor" strokeWidth={0} />
            <Badge tone="marigold">Sample — replace with real quote</Badge>
          </div>
          <blockquote className="font-display text-xl leading-snug font-semibold tracking-tight sm:text-2xl" aria-live="polite">
            “{item.quote}”
          </blockquote>
          <figcaption className="flex items-center gap-3">
            <Avatar name={item.name} />
            <span className="flex flex-col">
              <span className="font-extrabold">{item.name}</span>
              <span className="text-[13px] text-muted">{item.place}</span>
            </span>
          </figcaption>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {sampleTestimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className="flex size-6 items-center justify-center"
                >
                  <span className={cn("h-2 rounded-full transition-all", i === index ? "w-6 bg-forest" : "w-2 bg-line")} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white hover:border-forest">
                <ChevronLeft className="size-5" />
              </button>
              <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white hover:border-forest">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </figure>
      </Container>
    </Section>
  );
}
