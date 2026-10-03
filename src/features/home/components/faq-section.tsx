import { Mic, Plus } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";

import { faqs } from "../content";
import { OpenAdvisorButton } from "./open-advisor-button";

/** Native <details> accordion — accessible and works without JavaScript. */
export function FaqSection() {
  return (
    <Section id="faq">
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-4 lg:w-[360px] lg:shrink-0">
          <span className="eyebrow text-forest">FAQ</span>
          <h2 className="text-display-lg">Questions, answered.</h2>
          <p className="text-[17px] leading-relaxed text-muted">Can&apos;t find what you need? Ask our advisor in your language — by voice or text.</p>
          <OpenAdvisorButton className={buttonClasses({ variant: "outline", className: "mt-2 self-start" })}>
            <Mic className="size-[18px]" /> Ask Kirshify
          </OpenAdvisorButton>
        </div>
        <div className="flex-1 border-t border-line">
          {faqs.map((f, i) => (
            <details key={f.q} name="faq" open={i === 0} className="group border-b border-line">
              <summary className="flex min-h-19 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-extrabold hover:text-forest">
                {f.q}
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-sage text-forest transition group-open:rotate-45 group-open:bg-forest group-open:text-white">
                  <Plus className="size-[18px]" strokeWidth={2.4} />
                </span>
              </summary>
              <p className="pr-2 pb-6 leading-relaxed text-muted sm:pr-14">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
