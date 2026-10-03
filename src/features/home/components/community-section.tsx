import { ArrowRight, Leaf, MessageSquare, Play } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { CropArt } from "@/components/ui/crop-art";

const communities = ["Wheat growers", "Onion growers", "Cotton growers", "Soybean growers", "Basmati growers"];

const lessons = [
  { title: "Spotting early blight before it spreads", crop: "tomato" },
  { title: "Reading mandi rates before you sell", crop: "wheat" },
  { title: "Timing sowing around the monsoon", crop: "paddy" },
];

export function CommunitySection() {
  return (
    <Section id="community" tone="sage">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <span className="eyebrow text-forest">Community &amp; learning</span>
          <h2 className="text-display-lg">Learn together. Grow together.</h2>
          <p className="text-[17px] leading-relaxed text-muted">
            Crop-specific communities and short video lessons, so the best practices of one village reach the next — in the language farmers actually speak.
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {communities.map((c) => (
              <li key={c} className="rounded-full border border-line bg-white px-4 py-2.5 text-[14.5px] font-bold">
                {c}
              </li>
            ))}
            <li className="rounded-full bg-leaf-soft px-4 py-2.5 text-[14.5px] font-extrabold text-forest">+ more crops</li>
          </ul>
          <ButtonLink href="/sell" className="mt-1 self-start">
            Join a community <ArrowRight className="size-[18px]" />
          </ButtonLink>
        </div>

        <div className="flex flex-col gap-4">
          <article className="flex flex-col gap-3.5 rounded-3xl border border-line bg-white p-5">
            <header className="flex items-center gap-3">
              <Avatar name="Onion Nashik" />
              <span className="flex flex-1 flex-col">
                <span className="font-extrabold">Onion growers · Narsinghpur</span>
                <span className="text-[12.5px] text-muted">Community discussion</span>
              </span>
              <Badge>Joined</Badge>
            </header>
            <p className="leading-relaxed">Has anyone tried neem oil against thrips this season? The scanner flagged it on my plot yesterday.</p>
            <footer className="flex gap-5 text-[13px] font-bold text-muted">
              <span className="inline-flex items-center gap-1.5"><MessageSquare className="size-4" /> Replies</span>
              <span className="inline-flex items-center gap-1.5"><Leaf className="size-4" /> Linked scan</span>
            </footer>
          </article>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {lessons.map((l, i) => (
              <article key={l.title} className="flex flex-col gap-2.5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                  <CropArt cropSlug={l.crop} alt="" variant={i + 5} />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-forest shadow-lg">
                      <Play className="size-5 fill-current" />
                    </span>
                  </span>
                  <Badge tone="glass" className="absolute bottom-2.5 left-2.5">Video lesson</Badge>
                </div>
                <span className="text-[14.5px] leading-snug font-extrabold">{l.title}</span>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
