import { ArrowLeft, Sprout } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-mist px-4 text-center">
      <Logo />
      <span className="inline-flex size-16 items-center justify-center rounded-3xl bg-leaf-soft text-forest">
        <Sprout className="size-8" />
      </span>
      <h1 className="text-display-md">This field is still empty.</h1>
      <p className="max-w-md text-muted">The page you&apos;re looking for doesn&apos;t exist or the listing has been sold.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">
          <ArrowLeft className="size-4" /> Back home
        </ButtonLink>
        <ButtonLink href="/marketplace" variant="outline">
          Browse marketplace
        </ButtonLink>
      </div>
    </main>
  );
}
