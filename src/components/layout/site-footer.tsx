"use client";

import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { footerNav, siteConfig } from "@/config/site";
import { useLanguage } from "@/providers/language-provider";

const socials = ["YouTube", "Instagram", "Facebook", "WhatsApp"];

const copy = {
  en: {
    about: "Better prices, better farming. Kirshify helps Indian farmers sell directly to buyers, check mandi rates and get advice in their own language.",
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
  },
  hi: {
    about: "बेहतर दाम, बेहतर खेती। Kirshify भारतीय किसानों को सीधे खरीदारों को बेचने, मंडी भाव देखने और अपनी भाषा में सलाह पाने में मदद करता है।",
    rights: "सर्वाधिकार सुरक्षित।",
    privacy: "गोपनीयता",
    terms: "शर्तें",
  },
} as const;

export function SiteFooter() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const hi = lang === "hi";

  return (
    <footer className="bg-deep pt-16 pb-28 text-on-dark sm:pt-20" lang={lang}>
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo tone="dark" />
            <p className="text-[15px] leading-relaxed text-on-dark-muted">{t.about}</p>
            <p className="text-sm text-on-dark-muted">
              {siteConfig.contact.email} · {siteConfig.contact.phone}
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 lg:max-w-md">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-3 text-[15px]">
                <span className="eyebrow text-white">{hi ? group.titleHi : group.title}</span>
                {group.links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-on-dark-muted transition-colors hover:text-white">
                    {(hi && link.labelHi) || link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-deep-line pt-6 text-[13.5px] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Kirshify. {t.rights}
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              // TODO: point to real social profiles.
              <a key={s} href="#" className="hover:text-white">
                {s}
              </a>
            ))}
            <Link href="/#faq" className="hover:text-white">
              {t.privacy}
            </Link>
            <Link href="/#faq" className="hover:text-white">
              {t.terms}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
