"use client";

import { ArrowRight, Camera, HandCoins, MessageSquare, Smartphone, type LucideIcon } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

import { howItWorksCopy } from "../content";

const stepIcons: LucideIcon[] = [Smartphone, Camera, MessageSquare, HandCoins];

export function HowItWorks() {
  const { lang } = useLanguage();
  const t = howItWorksCopy[lang];

  return (
    <Section id="how-it-works" lang={lang}>
      <Container className="flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="eyebrow text-forest">{t.eyebrow}</span>
            <h2 className="text-display-lg text-balance">{t.title}</h2>
            <p className="text-[17px] leading-relaxed text-muted">{t.description}</p>
          </div>
          <ButtonLink href="/sell" size="lg" className="self-start lg:self-end">
            {t.cta} <ArrowRight className="size-[18px]" />
          </ButtonLink>
        </div>

        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {t.steps.map((step, i) => {
            const Icon = stepIcons[i];
            const last = i === t.steps.length - 1;
            return (
              <li key={step.title} className="flex items-start gap-4 rounded-3xl border border-line-soft bg-mist p-5 sm:flex-col sm:p-6">
                <div className="flex shrink-0 items-center justify-between sm:w-full">
                  <span
                    className={cn(
                      "inline-flex size-12 items-center justify-center rounded-full font-display text-xl font-extrabold",
                      last ? "bg-leaf text-ink" : "bg-forest text-white",
                    )}
                  >
                    {i + 1}
                  </span>
                  <Icon aria-hidden="true" className="hidden size-7 text-forest sm:block" strokeWidth={1.8} />
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <span className="text-lg leading-snug font-extrabold">{step.title}</span>
                  <span className="text-[15px] leading-normal text-muted">{step.body}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
