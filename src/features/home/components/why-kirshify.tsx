"use client";

import { ArrowRight, Gift, IndianRupee, Languages, Leaf, Scale, Smartphone, type LucideIcon } from "lucide-react";

import { HomeScreen, MarketScreen, PhoneFrame, ScanScreen } from "@/components/mockups/phone";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/providers/language-provider";

import { whyCopy } from "../content";

const pointIcons: LucideIcon[] = [IndianRupee, Gift, Languages, Smartphone, Scale, Leaf];

export function WhyKirshify() {
  const { lang } = useLanguage();
  const t = whyCopy[lang];

  return (
    <section id="why" className="relative overflow-hidden bg-deep py-18 text-white sm:py-24" lang={lang}>
      <div aria-hidden="true" className="absolute -top-80 -right-72 size-[720px] rounded-full bg-[#0D3A2A]" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="relative hidden h-[600px] items-center justify-center lg:flex">
          <PhoneFrame className="absolute top-14 left-0 scale-[0.8] -rotate-6 opacity-95">
            <MarketScreen />
          </PhoneFrame>
          <PhoneFrame className="relative z-10 scale-95">
            <ScanScreen />
          </PhoneFrame>
          <PhoneFrame className="absolute top-14 right-0 scale-[0.8] rotate-6 opacity-95">
            <HomeScreen />
          </PhoneFrame>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="eyebrow text-leaf">{t.eyebrow}</span>
            <h2 className="text-display-lg text-balance text-white">{t.title}</h2>
            <p className="max-w-lg text-[17px] leading-relaxed text-on-dark">{t.description}</p>
          </div>

          <ul className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            {t.points.map((point, i) => {
              const Icon = pointIcons[i];
              return (
                <li key={point.title} className="flex items-start gap-3.5">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-leaf text-ink">
                    <Icon aria-hidden="true" className="size-[22px]" strokeWidth={2} />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[17px] leading-snug font-extrabold">{point.title}</span>
                    <span className="text-[14.5px] leading-normal text-on-dark-muted">{point.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/sell" variant="accent" size="lg">
              {t.primary}
              <ArrowRight className="size-[18px]" />
            </ButtonLink>
            <ButtonLink href="/marketplace" variant="on-dark" size="lg">
              {t.secondary}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
