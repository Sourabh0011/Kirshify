"use client";

import { CircleCheck, CircleCheckBig, LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, Input, Label } from "@/components/ui/field";
import { formatINR } from "@/lib/utils";

const reasons = ["Direct from farmer", "Premium quality", "No middlemen", "Fair, mandi-linked price", "Verified seller"];

type Mode = "idle" | "offer" | "buy";

export function OfferPanel({ listingId, price, maxQty, verified }: { listingId: string; price: number; maxQty: number; verified: boolean }) {
  const [mode, setMode] = useState<Mode>("idle");
  const [offerPrice, setOfferPrice] = useState(String(price));
  const [qty, setQty] = useState(String(Math.min(10, maxQty)));
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (Number(qty) > maxQty) {
      setErrors({ quantityQtl: [`Only ${maxQty} qtl available`] });
      return;
    }
    setStatus("sending");
    setErrors({});
    const res = await fetch("/api/v1/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId, pricePerQtl: mode === "buy" ? price : offerPrice, quantityQtl: qty }),
    }).catch(() => null);
    if (!res) return setStatus("error");
    const json = await res.json();
    if (res.status === 422) {
      setErrors(json.error.details ?? {});
      setStatus("idle");
      return;
    }
    setStatus(res.ok ? "sent" : "error");
  }

  return (
    <section aria-label="Buy this crop" className="flex flex-col gap-4 rounded-3xl border border-line-soft bg-white p-5">
      <h2 className="font-extrabold">Why buy this?</h2>
      <ul className="flex flex-col gap-2.5 text-[14.5px]">
        {reasons.filter((r) => verified || r !== "Verified seller").map((r) => (
          <li key={r} className="flex items-center gap-2.5">
            <CircleCheck className="size-[18px] text-forest" /> {r}
          </li>
        ))}
      </ul>

      <div className="h-px bg-line-soft" />

      {status === "sent" ? (
        <div role="status" className="flex flex-col gap-2 rounded-2xl bg-leaf-soft p-4 text-forest">
          <CircleCheckBig className="size-7" />
          <span className="font-extrabold">{mode === "buy" ? "Purchase request sent" : "Offer sent"}</span>
          <span className="text-sm text-ink-soft">The seller will reply in Messages. You&apos;ll get an SMS too.</span>
        </div>
      ) : mode === "idle" ? (
        <>
          <h3 className="font-extrabold">Interested?</h3>
          <Button variant="soft" className="w-full rounded-xl" onClick={() => setMode("offer")}>
            Place an offer
          </Button>
          <Button className="w-full rounded-xl" onClick={() => setMode("buy")}>
            Buy now at {formatINR(price)}/qtl
          </Button>
        </>
      ) : (
        <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
          <h3 className="font-extrabold">{mode === "buy" ? "Buy at listed price" : "Make your offer"}</h3>
          {mode === "offer" && (
            <Field>
              <Label htmlFor="offer-price" required>Your price (₹/qtl)</Label>
              <Input id="offer-price" inputMode="numeric" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} aria-invalid={!!errors.pricePerQtl} />
              <FieldError message={errors.pricePerQtl?.[0]} />
            </Field>
          )}
          <Field>
            <Label htmlFor="offer-qty" required>Quantity (qtl)</Label>
            <Input id="offer-qty" inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value)} aria-invalid={!!errors.quantityQtl} />
            <FieldError message={errors.quantityQtl?.[0]} />
          </Field>
          {Number(qty) > 0 && (
            <p className="text-sm text-muted">
              Total: <b className="text-ink">{formatINR((mode === "buy" ? price : Number(offerPrice) || 0) * Number(qty))}</b> + 1% facilitation fee
            </p>
          )}
          {status === "error" && <FieldError message="Couldn't send right now. Check your connection and try again." />}
          <div className="flex gap-2">
            <Button variant="ghost" className="rounded-xl" onClick={() => setMode("idle")}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 rounded-xl" disabled={status === "sending"}>
              {status === "sending" && <LoaderCircle className="size-4 animate-spin" />}
              {mode === "buy" ? "Send request" : "Send offer"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
