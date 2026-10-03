"use client";

import { ArrowRight, Minus, Plus, TrendingUp } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { cn, formatINR } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

import { calculatorCopy } from "../content";

export interface CalculatorCrop {
  slug: string;
  name: string;
  nameHi?: string;
  rate: number;
}

const MIN_QTY = 10;
const MAX_QTY = 500;
const STEP = 10;
const BROKER_CUT = { low: 0.15, high: 0.2 };
const KIRSHIFY_FEE = 0.01;

export function EarningsCalculator({ crops }: { crops: CalculatorCrop[] }) {
  const { lang } = useLanguage();
  const t = calculatorCopy[lang];
  const cropName = (c: CalculatorCrop) => (lang === "hi" && c.nameHi) || c.name;
  const [cropSlug, setCropSlug] = useState(crops[0]?.slug);
  const [qty, setQty] = useState(50);
  const crop = crops.find((c) => c.slug === cropSlug) ?? crops[0];
  if (!crop) return null;

  const sale = crop.rate * qty;
  const brokerKeep = { low: sale * (1 - BROKER_CUT.high), high: sale * (1 - BROKER_CUT.low) };
  const kirshifyKeep = sale * (1 - KIRSHIFY_FEE);
  const extra = { low: kirshifyKeep - brokerKeep.high, high: kirshifyKeep - brokerKeep.low };
  const clamp = (n: number) => Math.min(MAX_QTY, Math.max(MIN_QTY, n));

  return (
    <Section id="earnings" lang={lang}>
      <Container>
        <div className="relative flex flex-col gap-10 overflow-hidden rounded-[36px] bg-forest p-5 text-white sm:p-10 lg:flex-row lg:gap-14 lg:p-16">
          <div aria-hidden="true" className="absolute -bottom-80 -left-64 size-[560px] rounded-full bg-forest-600" />

          <div className="relative flex flex-col gap-7 lg:flex-1">
            <div className="flex flex-col gap-4">
              <span className="eyebrow text-leaf">{t.eyebrow}</span>
              <h2 className="text-display-lg text-balance text-white">{t.title}</h2>
              <p className="max-w-md text-[17px] leading-relaxed text-on-dark">{t.description}</p>
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 font-extrabold">{t.chooseCrop}</legend>
              <div className="flex flex-wrap gap-2">
                {crops.map((c) => {
                  const selected = c.slug === crop.slug;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setCropSlug(c.slug)}
                      className={cn(
                        "flex min-h-14 flex-col items-start justify-center rounded-2xl border-[1.5px] px-4 py-2 text-left transition-colors",
                        selected ? "border-leaf bg-leaf text-ink" : "border-deep-border text-white hover:border-leaf",
                      )}
                    >
                      <span className="font-extrabold">{cropName(c)}</span>
                      <span className="text-xs font-bold opacity-80">
                        {formatINR(c.rate)}
                        {t.perQtl}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex flex-col gap-3.5">
              <label htmlFor="calc-qty" className="font-extrabold">
                {t.chooseQty}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label={t.decrease}
                  onClick={() => setQty((q) => clamp(q - STEP))}
                  className="inline-flex size-13 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-deep-border hover:border-leaf"
                >
                  <Minus className="size-5" strokeWidth={2.4} />
                </button>
                <output htmlFor="calc-qty" className="flex min-h-13 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#0A3A29]">
                  <span className="font-display text-3xl font-extrabold">{qty}</span>
                  <span className="font-bold text-on-dark-muted">{t.quintal}</span>
                </output>
                <button
                  type="button"
                  aria-label={t.increase}
                  onClick={() => setQty((q) => clamp(q + STEP))}
                  className="inline-flex size-13 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-deep-border hover:border-leaf"
                >
                  <Plus className="size-5" strokeWidth={2.4} />
                </button>
              </div>
              <input
                id="calc-qty"
                type="range"
                min={MIN_QTY}
                max={MAX_QTY}
                step={STEP}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="h-7 w-full cursor-pointer accent-leaf"
              />
              <div className="flex justify-between text-[12.5px] font-bold text-on-dark-muted">
                <span>
                  {MIN_QTY} {t.qtl}
                </span>
                <span>
                  {MAX_QTY} {t.qtl}
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col gap-6 rounded-[28px] bg-white p-5 text-ink sm:p-8 lg:w-[46%]" aria-live="polite">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-muted">
                {t.saleValue} · {qty} {t.qtl} {cropName(crop)} × {formatINR(crop.rate)}
                {t.perQtl}
              </span>
              <span className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{formatINR(sale)}</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-1">
                <span className="font-bold text-muted">{t.broker}</span>
                <span className="font-extrabold">
                  {formatINR(brokerKeep.low)} – {formatINR(brokerKeep.high)}
                </span>
              </div>
              <div className="relative h-4 overflow-hidden rounded-full bg-mist">
                <span className="absolute inset-y-0 left-0 w-[80%] bg-[#8A9A91]" />
                <span className="absolute inset-y-0 left-[80%] w-[5%] bg-[repeating-linear-gradient(135deg,#8A9A91_0_4px,#C7D0CB_4px_8px)]" />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-forest">
                <span className="font-bold">{t.kirshify}</span>
                <span className="font-extrabold">{formatINR(kirshifyKeep)}</span>
              </div>
              <div className="relative h-4 overflow-hidden rounded-full bg-mist">
                <span className="absolute inset-y-0 left-0 w-[99%] rounded-full bg-forest" />
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-[20px] bg-sage p-4 sm:p-5">
              <span className="inline-flex size-13 shrink-0 items-center justify-center rounded-2xl bg-leaf">
                <TrendingUp className="size-6" strokeWidth={2} />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-bold text-muted">{t.extra}</span>
                <span className="font-display text-2xl font-extrabold tracking-tight text-forest sm:text-3xl">
                  {formatINR(extra.low)} – {formatINR(extra.high)}
                </span>
              </span>
            </div>

            <ButtonLink href="/sell" size="lg" className="w-full">
              {t.cta}
              <ArrowRight className="size-[18px]" />
            </ButtonLink>
            <p className="text-[12.5px] leading-relaxed text-muted">{t.note}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
