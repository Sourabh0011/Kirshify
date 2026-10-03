"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { marketingNav } from "@/config/site";

import { LanguageToggle } from "./language-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <div className="bg-deep text-sm text-on-dark">
        <Container className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 py-2.5 text-center">
          <span className="rounded-full bg-leaf px-2.5 py-0.5 text-xs font-extrabold tracking-wide text-ink">PILOT</span>
          <span>Now inviting FPOs for our 3-district pilot — 500 farmers, 5 partner FPOs.</span>
          <Link href="/#roles" className="font-bold text-white underline underline-offset-4">
            Partner with us
          </Link>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-line-soft bg-white/95 backdrop-blur-md">
        <Container className="flex h-19 items-center gap-7">
          <Logo />
          <nav aria-label="Primary" className="hidden flex-1 items-center gap-6 text-[15px] font-semibold xl:flex">
            {marketingNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-ink-soft transition-colors hover:text-forest">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <LanguageToggle />
            <Link href="/marketplace" className="hidden min-h-11 items-center px-2 font-bold text-ink hover:text-forest lg:inline-flex">
              Log in
            </Link>
            <ButtonLink href="/sell" className="hidden sm:inline-flex">
              Get started
            </ButtonLink>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
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
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex gap-2.5 pt-4">
                <ButtonLink href="/marketplace" variant="outline" className="flex-1" onClick={close}>
                  Log in
                </ButtonLink>
                <ButtonLink href="/sell" className="flex-1" onClick={close}>
                  Get started
                </ButtonLink>
              </div>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
