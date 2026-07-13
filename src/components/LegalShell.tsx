import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import logoAsset from "@/assets/logo.jpeg.asset.json";

export function LegalShell({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-cream/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="C.H.M" className="h-10 w-10 rounded-full object-cover ring-1 ring-forest/20" />
            <div className="leading-tight">
              <div className="font-serif text-lg font-semibold text-forest-deep">C.H.M</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Centre Hélicicole Meye</div>
            </div>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-forest-deep hover:text-terracotta">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="section-title mt-3">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Dernière mise à jour&nbsp;: {updated}</p>

        <div className="legal-prose mt-10">{children}</div>
      </article>
    </main>
  );
}

// A dummy route export so this file registers cleanly under /routes.
// The shell itself is used by the actual legal routes.
export const Route = createFileRoute("/_legal-shell")({
  component: () => null,
});
