"use client";

import { ArrowRight, Check, Leaf, ShoppingBag } from "lucide-react";

import { HomeScreen, PhoneFrame } from "@/components/mockups/phone";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

import { heroCopy } from "../content";
import { QuickActions } from "./quick-actions";

export function Hero() {
  const { lang } = useLanguage();
  const t = heroCopy[lang];
  const hi = lang === "hi";

  return (
    <section id="top" className="pt-8 pb-14 sm:pt-12 lg:pt-16 lg:pb-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6 sm:gap-7" lang={lang}>
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-sage py-2 pr-3.5 pl-2.5 text-sm font-bold text-forest">
              <Leaf className="size-[18px]" strokeWidth={1.9} />
              {t.eyebrow}
            </span>
            <h1 className={cn("text-display-hero text-balance", hi && "font-hindi leading-[1.18]! tracking-normal!")}>
              {t.titleLead}{" "}
              <span className="bg-[linear-gradient(transparent_64%,var(--color-leaf)_64%,var(--color-leaf)_92%,transparent_92%)] text-forest">
                {t.titleAccent}
              </span>
            </h1>
            <p className={cn("max-w-xl text-lg text-muted sm:text-xl", hi ? "leading-[1.75]" : "leading-relaxed")}>{t.body}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/sell" size="lg">
                {t.primary}
                <ArrowRight className="size-[18px]" />
              </ButtonLink>
              <ButtonLink href="/marketplace" size="lg" variant="outline">
                {t.secondary}
              </ButtonLink>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line-soft pt-5 text-[14.5px] font-semibold text-ink-soft">
              {t.trust.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <Check className="size-[18px] text-forest" strokeWidth={2.4} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <HeroVisual />
        </div>

        <QuickActions />
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative flex min-h-[580px] items-center justify-center overflow-hidden rounded-[36px] bg-forest px-5 py-8 sm:min-h-[620px] lg:min-h-[660px]">
      <div aria-hidden="true" className="absolute -right-64 -bottom-72 size-[640px] rounded-full bg-forest-600" />
      <div aria-hidden="true" className="absolute -right-36 -bottom-48 size-[420px] rounded-full bg-forest-500" />
      <div aria-hidden="true" className="absolute -top-40 -left-40 size-[360px] rounded-full bg-forest-700" />

      <PhoneFrame className="relative z-10 scale-[0.88] sm:scale-100">
        <HomeScreen />
      </PhoneFrame>

      <div className="absolute top-16 left-5 z-20 hidden w-[228px] items-center gap-3 rounded-2xl bg-white p-3.5 shadow-float sm:flex">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-marigold-soft text-marigold-ink">
          <ShoppingBag className="size-5" strokeWidth={1.9} />
        </span>
        <span className="flex flex-col">
          <span className="text-xs font-bold text-muted">New direct offer</span>
          <span className="text-sm font-extrabold">Onion · 120 qtl</span>
          <span className="text-[12.5px] font-bold text-forest">₹1,480/qtl · No broker</span>
        </span>
      </div>

      <div className="absolute top-80 right-5 z-20 hidden w-[214px] flex-col gap-2.5 rounded-2xl bg-white p-3.5 shadow-float sm:flex">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-leaf-soft text-forest">
            <Leaf className="size-5" strokeWidth={1.9} />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-extrabold">Early Blight</span>
            <span className="text-xs font-semibold text-muted">94% confidence</span>
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line-soft">
          <div className="h-full w-[94%] rounded-full bg-forest" />
        </div>
        <span className="text-xs leading-snug text-ink-soft">Organic fix: neem oil spray, 3-day interval</span>
      </div>

      <div className="absolute bottom-10 left-5 z-20 flex flex-col rounded-2xl bg-leaf px-4 py-3.5 text-ink shadow-float">
        <span className="font-display text-3xl leading-none font-extrabold tracking-tight">+35–40%</span>
        <span className="text-[12.5px] font-bold">margin back to the farmer</span>
      </div>
    </div>
  );
}
