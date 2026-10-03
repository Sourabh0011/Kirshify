"use client";

import { cn } from "@/lib/utils";
import { useLanguage, type Language } from "@/providers/language-provider";

const options: { value: Language; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "hi", label: "हिंदी" },
];

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div role="group" aria-label="Language" className={cn("inline-flex gap-0.5 rounded-full bg-sage p-[3px]", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={lang === o.value}
          onClick={() => setLang(o.value)}
          className={cn(
            "min-h-11 min-w-12 rounded-full px-3 text-sm font-extrabold transition-colors",
            lang === o.value ? "bg-forest text-white" : "text-ink-soft hover:text-forest",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
