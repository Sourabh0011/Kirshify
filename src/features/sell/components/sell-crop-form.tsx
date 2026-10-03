"use client";

import { ArrowLeft, ArrowRight, CircleCheckBig, ImagePlus, Info, LoaderCircle, MapPin, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import { CropArt } from "@/components/ui/crop-art";
import { Field, FieldError, Input, Label, Select, Textarea } from "@/components/ui/field";
import { crops } from "@/config/crops";
import { createListingSchema } from "@/lib/validators/listing";
import { cn, formatINR } from "@/lib/utils";

import { Stepper } from "./stepper";

const STEPS = ["Basic details", "Quantity & price", "Photos", "Review & publish"];
const MAX_PHOTOS = 5;
const MAX_PHOTO_MB = 5;

type FormState = {
  cropSlug: string;
  variety: string;
  grade: "" | "A" | "B" | "C";
  location: string;
  state: string;
  quantityQtl: string;
  pricePerQtl: string;
  availableFrom: string;
  description: string;
};

type Errors = Partial<Record<keyof FormState | "photos" | "form", string>>;

const STEP_FIELDS: (keyof FormState)[][] = [
  ["cropSlug", "variety", "grade", "location", "state"],
  ["quantityQtl", "pricePerQtl", "availableFrom", "description"],
  [],
  [],
];

interface SellCropFormProps {
  /** Today's modal price per crop at the seller's mandi, for price guidance. */
  mandiRates: Record<string, number>;
  defaultLocation: string;
}

export function SellCropForm({ mandiRates, defaultLocation }: SellCropFormProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    cropSlug: "soybean",
    variety: "",
    grade: "A",
    location: defaultLocation,
    state: "Madhya Pradesh",
    quantityQtl: "",
    pricePerQtl: "",
    availableFrom: "",
    description: "",
  });
  const [photos, setPhotos] = useState<{ name: string; url: string }[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  // Release preview object URLs when the form unmounts.
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  function removePhoto(url: string) {
    URL.revokeObjectURL(url);
    setPhotos((all) => all.filter((x) => x.url !== url));
  }

  const crop = crops.find((c) => c.slug === form.cropSlug);
  const mandiRate = mandiRates[form.cropSlug];
  const price = Number(form.pricePerQtl);
  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function payload() {
    return {
      ...form,
      // Empty strings become undefined so the schema reports "Enter a quantity" rather than "must be more than 0".
      quantityQtl: form.quantityQtl.trim() || undefined,
      pricePerQtl: form.pricePerQtl.trim() || undefined,
      variety: form.variety || undefined,
      availableFrom: form.availableFrom || undefined,
      description: form.description || undefined,
    };
  }

  function validate(fields: (keyof FormState)[]): boolean {
    const result = createListingSchema.safeParse(payload());
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: Errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof FormState;
      if (fields.includes(key) && !next[key]) next[key] = issue.message;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (step < 2 && !validate(STEP_FIELDS[step])) return;
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addPhotos(files: FileList | null) {
    if (!files) return;
    const accepted: { name: string; url: string }[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
        setErrors((e) => ({ ...e, photos: `${file.name} is larger than ${MAX_PHOTO_MB} MB` }));
        continue;
      }
      accepted.push({ name: file.name, url: URL.createObjectURL(file) });
    }
    setPhotos((p) => [...p, ...accepted].slice(0, MAX_PHOTOS));
  }

  async function publish() {
    if (!validate([...STEP_FIELDS[0], ...STEP_FIELDS[1]])) {
      setStep(0);
      return;
    }
    setSubmitting(true);
    try {
      // TODO: upload `photos` to object storage first and send their URLs.
      const res = await fetch("/api/v1/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors({ form: json.error?.message ?? "Could not publish your listing." });
        return;
      }
      setCreatedId(json.data.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrors({ form: "You seem to be offline. Your details are saved here — try again when connected." });
    } finally {
      setSubmitting(false);
    }
  }

  if (createdId) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-line-soft bg-white px-6 py-14 text-center" role="status">
        <span className="inline-flex size-16 items-center justify-center rounded-3xl bg-leaf-soft text-forest">
          <CircleCheckBig className="size-8" />
        </span>
        <h2 className="text-display-md">Your {crop?.name.toLowerCase()} is live!</h2>
        <p className="max-w-md text-muted">Buyers near {form.location} can now see your listing. We&apos;ll notify you by SMS when an offer arrives.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href={`/marketplace/${createdId}`}>View listing</ButtonLink>
          <Button
            variant="outline"
            onClick={() => {
              setCreatedId(null);
              setStep(0);
              photos.forEach((p) => URL.revokeObjectURL(p.url));
              setPhotos([]);
              setForm((f) => ({ ...f, quantityQtl: "", pricePerQtl: "", description: "", variety: "" }));
            }}
          >
            List another crop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-line-soft bg-white p-4 sm:p-7">
      <Stepper steps={STEPS} current={step} />
      <p className="text-sm font-bold text-forest md:hidden">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step === STEPS.length - 1) void publish();
          else goNext();
        }}
        className="flex flex-col gap-6"
      >
        {step === 0 && (
          <fieldset className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <legend className="mb-4 text-lg font-extrabold">Crop details</legend>
            <Field>
              <Label htmlFor="cropSlug" required>Select crop</Label>
              <Select id="cropSlug" value={form.cropSlug} onChange={set("cropSlug")} aria-invalid={!!errors.cropSlug}>
                {crops.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name} ({c.nameHi})
                  </option>
                ))}
              </Select>
              <FieldError message={errors.cropSlug} />
            </Field>
            <Field>
              <Label htmlFor="variety">Variety (optional)</Label>
              <Input id="variety" placeholder="e.g. JS 335, Sharbati" value={form.variety} onChange={set("variety")} />
            </Field>
            <Field>
              <Label htmlFor="grade" required>Quality grade</Label>
              <Select id="grade" value={form.grade} onChange={set("grade")} aria-invalid={!!errors.grade} aria-describedby="grade-error">
                <option value="">Select grade</option>
                <option value="A">A (Premium)</option>
                <option value="B">B (Standard)</option>
                <option value="C">C (Fair average)</option>
              </Select>
              <FieldError id="grade-error" message={errors.grade} />
            </Field>
            <Field>
              <Label htmlFor="location" required>Village / town</Label>
              <span className="relative">
                <Input id="location" value={form.location} onChange={set("location")} aria-invalid={!!errors.location} aria-describedby="location-error" className="pr-11" />
                <MapPin aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3.5 size-[18px] -translate-y-1/2 text-muted" />
              </span>
              <FieldError id="location-error" message={errors.location} />
            </Field>
            <Field className="md:col-span-2">
              <Label htmlFor="state" required>State</Label>
              <Select id="state" value={form.state} onChange={set("state")}>
                {["Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Uttar Pradesh", "Gujarat"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <legend className="mb-4 text-lg font-extrabold">Quantity &amp; price</legend>
            <Field>
              <Label htmlFor="quantityQtl" required>Total quantity (quintal)</Label>
              <Input id="quantityQtl" inputMode="decimal" placeholder="e.g. 80" value={form.quantityQtl} onChange={set("quantityQtl")} aria-invalid={!!errors.quantityQtl} aria-describedby="qty-error" />
              <FieldError id="qty-error" message={errors.quantityQtl} />
            </Field>
            <Field>
              <Label htmlFor="pricePerQtl" required>Expected price (₹ per quintal)</Label>
              <Input id="pricePerQtl" inputMode="numeric" placeholder={mandiRate ? String(mandiRate) : "e.g. 4200"} value={form.pricePerQtl} onChange={set("pricePerQtl")} aria-invalid={!!errors.pricePerQtl} aria-describedby="price-hint price-error" />
              <FieldError id="price-error" message={errors.pricePerQtl} />
              {mandiRate && (
                <p id="price-hint" className="flex items-start gap-2 rounded-xl bg-mist px-3 py-2.5 text-[13px] text-ink-soft">
                  <Info className="mt-0.5 size-4 shrink-0 text-forest" />
                  <span>
                    Today&apos;s mandi rate for {crop?.name}: <b>{formatINR(mandiRate)}/qtl</b>
                    {price > 0 && (
                      <>
                        {" · "}
                        <span className={cn("font-bold", price >= mandiRate ? "text-forest" : "text-marigold-ink")}>
                          {Math.abs(((price - mandiRate) / mandiRate) * 100).toFixed(1)}% {price >= mandiRate ? "above" : "below"}
                        </span>
                      </>
                    )}
                  </span>
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="availableFrom">Available from</Label>
              <Input id="availableFrom" type="date" value={form.availableFrom} onChange={set("availableFrom")} />
            </Field>
            <Field>
              <Label htmlFor="estimate">Estimated sale value</Label>
              <output id="estimate" className="flex min-h-12 items-center rounded-xl bg-sage px-4 font-extrabold text-forest">
                {Number(form.quantityQtl) > 0 && price > 0 ? formatINR(Number(form.quantityQtl) * price) : "—"}
              </output>
            </Field>
            <Field className="md:col-span-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea id="description" maxLength={500} placeholder="Moisture, storage, packing, pickup details…" value={form.description} onChange={set("description")} aria-invalid={!!errors.description} />
              <span className="self-end text-xs text-muted">{form.description.length}/500</span>
              <FieldError message={errors.description} />
            </Field>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-4 text-lg font-extrabold">Add photos</legend>
            <p className="-mt-2 text-sm text-muted">Clear photos help buyers trust your listing. Add up to {MAX_PHOTOS} — JPG or PNG, max {MAX_PHOTO_MB} MB each.</p>
            <label
              htmlFor="photos"
              className="flex min-h-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-mist p-6 text-center hover:border-forest"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addPhotos(e.dataTransfer.files);
              }}
            >
              <ImagePlus className="size-9 text-forest" strokeWidth={1.6} />
              <span className="font-bold">Tap to take or upload photos</span>
              <span className="text-[13px] text-muted">or drag and drop here</span>
              <input id="photos" type="file" accept="image/*" capture="environment" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} />
            </label>
            <FieldError message={errors.photos} />
            {photos.length > 0 && (
              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {photos.map((p, i) => (
                  <li key={p.url} className="relative aspect-square overflow-hidden rounded-xl bg-sage">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                    <img src={p.url} alt={`Photo ${i + 1}: ${p.name}`} className="size-full object-cover" />
                    <button
                      type="button"
                      aria-label={`Remove ${p.name}`}
                      onClick={() => removePhoto(p.url)}
                      className="absolute top-1.5 right-1.5 inline-flex size-9 items-center justify-center rounded-full bg-ink/75 text-white"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </fieldset>
        )}

        {step === 3 && (
          <section aria-label="Review" className="grid grid-cols-1 gap-5 md:grid-cols-[220px_1fr]">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl md:aspect-square">
              {photos[0] ? (
                // eslint-disable-next-line @next/next/no-img-element -- local blob preview
                <img src={photos[0].url} alt="Cover photo" className="size-full object-cover" />
              ) : (
                <CropArt cropSlug={form.cropSlug} alt={crop?.name ?? "Crop"} />
              )}
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 self-start">
              {[
                ["Crop", `${crop?.name}${form.variety ? ` · ${form.variety}` : ""}`],
                ["Grade", form.grade || "—"],
                ["Quantity", `${form.quantityQtl} qtl`],
                ["Price", `${formatINR(price)}/qtl`],
                ["Location", `${form.location}, ${form.state}`],
                ["Photos", `${photos.length} added`],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5">
                  <dt className="text-[13px] text-muted">{k}</dt>
                  <dd className="font-bold">{v}</dd>
                </div>
              ))}
              <div className="col-span-2 rounded-xl bg-leaf-soft px-4 py-3 text-sm text-forest">
                Listing is free. A <b>1% facilitation fee</b> applies only when you accept an offer and the trade closes.
              </div>
            </dl>
          </section>
        )}

        <FieldError message={errors.form} />

        <div className="flex items-center justify-between gap-3 border-t border-line-soft pt-5">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="size-4" /> Back
            </Button>
          ) : (
            <Link href="/marketplace" className="inline-flex min-h-12 items-center px-2 text-sm font-bold text-muted hover:text-ink">
              Cancel
            </Link>
          )}
          <Button type="submit" disabled={submitting}>
            {submitting && <LoaderCircle className="size-4 animate-spin" />}
            {step === STEPS.length - 1 ? "Publish listing" : `Next: ${STEPS[step + 1]}`}
            {step < STEPS.length - 1 && <ArrowRight className="size-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
