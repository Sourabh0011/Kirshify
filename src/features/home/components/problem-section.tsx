import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

import { brokerChain, problemStats } from "../content";

export function ProblemSection() {
  return (
    <Section>
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          layout="split"
          eyebrow="The problem"
          title={
            <>
              The broker trap: <span className="whitespace-nowrap">4–6 middlemen</span>, one squeezed farmer.
            </>
          }
          description="Every hop skims a margin — none of it accountable to the farmer, none of it visible to the buyer."
        />

        <div className="flex flex-col gap-7 rounded-[32px] bg-sage p-5 sm:p-8 lg:p-12">
          <div className="flex flex-col gap-4">
            <span className="eyebrow text-muted">Today</span>
            <ol className="flex flex-wrap items-center gap-2.5">
              {brokerChain.map((step, i) => {
                const isEnd = i === 0 || i === brokerChain.length - 1;
                return (
                  <li key={step} className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "inline-flex min-h-12 items-center rounded-2xl px-4 text-[15px] sm:min-h-13",
                        i === 0 && "bg-forest font-bold text-white",
                        i === brokerChain.length - 1 && "bg-ink font-bold text-white",
                        !isEnd && "border border-line bg-white font-semibold text-ink-soft",
                      )}
                    >
                      {step}
                    </span>
                    {i < brokerChain.length - 1 && (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-marigold-ink">
                        {i === brokerChain.length - 2 ? "+markup" : "−margin"}
                        <ArrowRight className="size-4" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="h-px bg-line" />
          <div className="flex flex-col gap-4">
            <span className="eyebrow text-forest">With Kirshify</span>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex min-h-14 items-center rounded-2xl bg-forest px-5 font-bold text-white">Farmer / FPO</span>
              <span aria-hidden="true" className="h-0.5 min-w-8 flex-1 bg-forest sm:max-w-48" />
              <span className="inline-flex min-h-16 items-center gap-2.5 rounded-[18px] border-2 border-forest bg-white px-5 font-extrabold">
                <LogoMark size={28} />
                Kirshify marketplace
                <span className="rounded-full bg-leaf px-2.5 py-1 text-xs font-extrabold">1% fee</span>
              </span>
              <span aria-hidden="true" className="h-0.5 min-w-8 flex-1 bg-forest sm:max-w-48" />
              <span className="inline-flex min-h-14 items-center rounded-2xl bg-ink px-5 font-bold text-white">Buyer / Consumer</span>
            </div>
            <p className="text-[15px] text-muted">One transparent hop, priced against live APMC rates.</p>
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {problemStats.map((s) => (
            <div key={s.value} className="flex flex-col gap-2.5 rounded-3xl border border-line p-6 sm:p-7">
              <dt className="order-2 text-base leading-normal text-ink-soft">{s.label}</dt>
              <dd className="order-1 font-display text-5xl leading-none font-extrabold tracking-[-0.04em] text-forest sm:text-6xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
