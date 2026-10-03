"use client";

import { ArrowRight, CircleCheck, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

import { ctaCopy } from "../content";

const signupRoles = ["farmer", "buyer"] as const;

export function CtaSection() {
  const { lang } = useLanguage();
  const t = ctaCopy[lang];
  const [role, setRole] = useState<(typeof signupRoles)[number]>("farmer");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setError(true);
      return;
    }
    setError(false);
    // TODO: POST /api/v1/auth/otp with { phone: digits, role } once Clerk phone auth is configured.
    setSent(true);
  }

  return (
    <section id="start" className="bg-white pb-16 sm:pb-24" lang={lang}>
      <Container>
        <div className="relative flex flex-col gap-10 overflow-hidden rounded-[40px] bg-forest p-6 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-20">
          <div aria-hidden="true" className="absolute -right-44 -bottom-72 size-[520px] rounded-full bg-forest-600" />
          <div aria-hidden="true" className="absolute -top-52 right-10 size-[300px] rounded-full bg-forest-700" />

          <div className="relative flex flex-col gap-4 lg:max-w-lg">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance">
              {t.title}
            </h2>
            <p className="text-[17px] leading-relaxed text-on-dark">{t.body}</p>
          </div>

          <div className="relative flex w-full flex-col gap-4 lg:max-w-[500px]">
            {sent ? (
              <div className="flex flex-col gap-3 rounded-3xl bg-white/10 p-6" role="status">
                <CircleCheck className="size-9 text-leaf" />
                <span className="text-xl font-extrabold">{t.sentTitle}</span>
                <span className="text-on-dark">{t.sent(phone, t.roles[role])}</span>
                <button type="button" onClick={() => setSent(false)} className="self-start font-bold text-leaf underline underline-offset-4">
                  {t.change}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-4">
                <fieldset className="flex flex-col gap-2.5">
                  <legend className="mb-2.5 text-sm font-extrabold">{t.iAm}</legend>
                  <div className="flex flex-wrap gap-2">
                    {signupRoles.map((r) => (
                      <button
                        key={r}
                        type="button"
                        aria-pressed={role === r}
                        onClick={() => setRole(r)}
                        className={cn(
                          "min-h-12 rounded-full border-[1.5px] px-6 text-base font-extrabold transition-colors",
                          role === r ? "border-leaf bg-leaf text-ink" : "border-deep-border hover:border-leaf",
                        )}
                      >
                        {t.roles[r]}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label htmlFor="cta-phone" className="text-sm font-extrabold">
                  {t.phoneLabel}
                </label>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <div className="flex min-h-14 flex-1 items-center rounded-full bg-white pr-2 pl-5 text-ink">
                    <span className="border-r border-line pr-2.5 font-extrabold">+91</span>
                    <input
                      id="cta-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-invalid={error}
                      aria-describedby={error ? "cta-phone-error" : "cta-phone-hint"}
                      className="min-h-13 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-leaf px-6 font-extrabold text-ink hover:bg-[#9bd34f]"
                  >
                    {t.submit} <ArrowRight className="size-[18px]" />
                  </button>
                </div>
                {error ? (
                  <p id="cta-phone-error" role="alert" className="text-sm font-bold text-marigold">
                    {t.error}
                  </p>
                ) : (
                  <p id="cta-phone-hint" className="text-[13px] text-on-dark-muted">
                    {t.hint}
                  </p>
                )}
              </form>
            )}
            <Link
              href="/marketplace"
              className="inline-flex min-h-12 items-center gap-2.5 self-start rounded-2xl border border-deep-border px-4 text-sm font-bold hover:bg-white/10"
            >
              <ShoppingBag className="size-[18px]" /> {t.browse}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
