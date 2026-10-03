"use client";

import { ArrowRight, CircleCheck, Globe, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const signupRoles = ["Farmer", "FPO", "Buyer", "Labourer"] as const;

export function CtaSection() {
  const [role, setRole] = useState<(typeof signupRoles)[number]>("Farmer");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setError(null);
    // TODO: POST /api/v1/auth/otp with { phone: digits, role } once Clerk phone auth is configured.
    setSent(true);
  }

  return (
    <section id="start" className="bg-white pb-16 sm:pb-24">
      <Container>
        <div className="relative flex flex-col gap-10 overflow-hidden rounded-[40px] bg-forest p-6 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-20">
          <div aria-hidden="true" className="absolute -right-44 -bottom-72 size-[520px] rounded-full bg-forest-600" />
          <div aria-hidden="true" className="absolute -top-52 right-10 size-[300px] rounded-full bg-forest-700" />

          <div className="relative flex flex-col gap-4 lg:max-w-lg">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-none font-extrabold tracking-[-0.035em]">
              Take the broker out of your harvest.
            </h2>
            <p className="text-[17px] leading-relaxed text-on-dark">
              Join as a farmer, FPO, buyer or labourer. Signing up is free — the 1% fee applies only when a trade closes.
            </p>
          </div>

          <div className="relative flex w-full flex-col gap-4 lg:max-w-[500px]">
            {sent ? (
              <div className="flex flex-col gap-3 rounded-3xl bg-white/10 p-6" role="status">
                <CircleCheck className="size-9 text-leaf" />
                <span className="text-xl font-extrabold">Almost there!</span>
                <span className="text-on-dark">
                  We&apos;ll send a one-time code to +91 {phone} to set up your {role.toLowerCase()} account.
                </span>
                <button type="button" onClick={() => setSent(false)} className="self-start font-bold text-leaf underline underline-offset-4">
                  Use a different number
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-4">
                <fieldset className="flex flex-col gap-2.5">
                  <legend className="mb-2.5 text-sm font-extrabold">I am a…</legend>
                  <div className="flex flex-wrap gap-2">
                    {signupRoles.map((r) => (
                      <button
                        key={r}
                        type="button"
                        aria-pressed={role === r}
                        onClick={() => setRole(r)}
                        className={cn(
                          "min-h-11 rounded-full border-[1.5px] px-4.5 text-[14.5px] font-extrabold transition-colors",
                          role === r ? "border-leaf bg-leaf text-ink" : "border-deep-border hover:border-leaf",
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label htmlFor="cta-phone" className="text-sm font-extrabold">
                  Mobile number
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
                      aria-invalid={!!error}
                      aria-describedby={error ? "cta-phone-error" : "cta-phone-hint"}
                      className="min-h-13 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-leaf px-6 font-extrabold text-ink hover:bg-[#9bd34f]"
                  >
                    Get started <ArrowRight className="size-[18px]" />
                  </button>
                </div>
                {error ? (
                  <p id="cta-phone-error" role="alert" className="text-sm font-bold text-marigold">
                    {error}
                  </p>
                ) : (
                  <p id="cta-phone-hint" className="text-[13px] text-on-dark-muted">
                    We&apos;ll send a one-time code to verify your number.
                  </p>
                )}
              </form>
            )}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <Link href="/marketplace" className="inline-flex min-h-12 items-center gap-2.5 rounded-2xl border border-deep-border px-4 text-sm font-bold hover:bg-white/10">
                <Smartphone className="size-[18px]" /> Android app
              </Link>
              <Link href="/marketplace" className="inline-flex min-h-12 items-center gap-2.5 rounded-2xl border border-deep-border px-4 text-sm font-bold hover:bg-white/10">
                <Globe className="size-[18px]" /> Open web app
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
