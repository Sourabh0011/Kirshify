import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { footerNav, siteConfig } from "@/config/site";

const socials = ["YouTube", "Instagram", "LinkedIn", "X"];

export function SiteFooter() {
  return (
    <footer className="bg-deep pt-16 pb-28 text-on-dark sm:pt-20">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo tone="dark" />
            <p className="text-[15px] leading-relaxed text-on-dark-muted">
              Better farming. Brighter future. An AI-driven farm-to-consumer marketplace and advisory platform for India.
            </p>
            <p className="text-sm text-on-dark-muted">
              {siteConfig.contact.email} · {siteConfig.contact.phone}
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:max-w-2xl">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-3 text-[15px]">
                <span className="eyebrow text-white">{group.title}</span>
                {group.links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-on-dark-muted transition-colors hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-deep-line pt-6 text-[13.5px] text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Kirshify. All rights reserved.</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              // TODO: point to real social profiles.
              <a key={s} href="#" className="hover:text-white">
                {s}
              </a>
            ))}
            <Link href="/#faq" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/#faq" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
