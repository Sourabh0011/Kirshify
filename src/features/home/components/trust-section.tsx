import { Cpu, IndianRupee, ShieldCheck, WifiOff, type LucideIcon } from "lucide-react";

import { Container, Section } from "@/components/ui/container";
import { IconTile, type IconTone } from "@/components/ui/icon-tile";
import { SectionHeading } from "@/components/ui/section-heading";

const cards: { icon: LucideIcon; tone: IconTone; title: string; body: string; tag: string }[] = [
  { icon: ShieldCheck, tone: "leaf", title: "Secure sign-in", body: "Every account is protected with Clerk authentication.", tag: "Clerk" },
  { icon: WifiOff, tone: "sky", title: "Works offline", body: "A lightweight web app with an offline-first cache that syncs when you're back online.", tag: "React PWA" },
  { icon: IndianRupee, tone: "marigold", title: "Fair, public prices", body: "Floor prices come straight from live APMC data, visible to both sides.", tag: "Agmarknet" },
  { icon: Cpu, tone: "plum", title: "Proven AI", body: "Disease detection on ResNet-50 with MobileNet; advice powered by Google Gemini.", tag: "ResNet-50 · Gemini" },
];

const stack = ["Next.js", "React", "Tailwind CSS", "FastAPI", "Express.js", "MongoDB Atlas", "Geo-spatial indexing"];

export function TrustSection() {
  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Built to be trusted" title="Safe, fair and made for village networks." />
          <dl className="flex flex-wrap gap-3">
            <div className="flex flex-col-reverse rounded-2xl bg-sage px-5 py-4">
              <dt className="text-[13px] font-semibold text-muted">leaf images in training set</dt>
              <dd className="font-display text-3xl font-extrabold tracking-tight text-forest">50,000+</dd>
            </div>
            <div className="flex flex-col-reverse rounded-2xl bg-sage px-5 py-4">
              <dt className="text-[13px] font-semibold text-muted">hosting cost per AI scan</dt>
              <dd className="font-display text-3xl font-extrabold tracking-tight text-forest">$0.002</dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <div key={c.title} className="flex flex-col gap-3.5 rounded-3xl border border-line-soft bg-mist p-6">
              <IconTile icon={c.icon} tone={c.tone} />
              <span className="text-lg font-extrabold">{c.title}</span>
              <span className="flex-1 text-[15px] leading-relaxed text-muted">{c.body}</span>
              <span className="self-start rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-muted">{c.tag}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="eyebrow pr-1.5 text-muted">Tech stack</span>
          {stack.map((s) => (
            <span key={s} className="rounded-full border border-line px-3 py-1.5 text-[13.5px] font-bold">
              {s}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
