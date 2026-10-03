"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { marketingNav, type NavItem } from "@/config/site";
import { useLanguage } from "@/providers/language-provider";

import { LanguageToggle } from "./language-toggle";

const copy = {
  en: { login: "Log in", start: "Get started", openMenu: "Open menu", closeMenu: "Close menu" },
  hi: { login: "लॉग इन", start: "शुरू करें", openMenu: "मेन्यू खोलें", closeMenu: "मेन्यू बंद करें" },
} as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { lang } = useLanguage();
  const t = copy[lang];
  const label = (item: NavItem) => (lang === "hi" && item.labelHi) || item.label;

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-white/95 backdrop-blur-md" lang={lang}>
      <Container className="flex h-19 items-center gap-7">
        <Logo />
        <nav aria-label="Primary" className="hidden flex-1 items-center gap-6 text-[15px] font-semibold xl:flex">
          {marketingNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink-soft transition-colors hover:text-forest">
              {label(item)}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <LanguageToggle />
          <Link href="/marketplace" className="hidden min-h-11 items-center px-2 font-bold text-ink hover:text-forest lg:inline-flex">
            {t.login}
          </Link>
          <ButtonLink href="/sell" className="hidden sm:inline-flex">
            {t.start}
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex size-12 items-center justify-center rounded-2xl border border-line text-ink xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-line-soft bg-white xl:hidden">
          <Container className="flex flex-col pb-5">
            <nav aria-label="Mobile" className="flex flex-col text-[17px] font-bold">
              {marketingNav.map((item) => (
                <Link key={item.href} href={item.href} onClick={close} className="flex min-h-14 items-center border-b border-line-soft">
                  {label(item)}
                </Link>
              ))}
            </nav>
            <div className="flex gap-2.5 pt-4">
              <ButtonLink href="/marketplace" variant="outline" className="flex-1" onClick={close}>
                {t.login}
              </ButtonLink>
              <ButtonLink href="/sell" className="flex-1" onClick={close}>
                {t.start}
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
