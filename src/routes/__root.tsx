import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-serif text-forest-deep">404</h1>
        <h2 className="mt-4 text-xl font-serif text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary inline-flex">Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-serif text-forest-deep">Une erreur est survenue</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Merci de rafraîchir la page ou de revenir à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Réessayer
          </button>
          <a href="/" className="btn-terracotta">Accueil</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Centre Hélicicole Meye — Héliciculture d'excellence à Yaoundé" },
      { name: "description", content: "Centre Hélicicole Meye (C.H.M) à Messamendongo-Yaoundé : élevage d'escargots géants d'Afrique, formations, pharmacopée traditionnelle et agro-écologie urbaine avec Daniel Meye." },
      { name: "author", content: "Centre Hélicicole Meye" },
      { property: "og:title", content: "Centre Hélicicole Meye — Héliciculture d'excellence à Yaoundé" },
      { property: "og:description", content: "Centre Hélicicole Meye (C.H.M) à Messamendongo-Yaoundé : élevage d'escargots géants d'Afrique, formations, pharmacopée traditionnelle et agro-écologie urbaine avec Daniel Meye." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Centre Hélicicole Meye — Héliciculture d'excellence à Yaoundé" },
      { name: "twitter:description", content: "Centre Hélicicole Meye (C.H.M) à Messamendongo-Yaoundé : élevage d'escargots géants d'Afrique, formations, pharmacopée traditionnelle et agro-écologie urbaine avec Daniel Meye." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/5kEVguQkw9NttDYdmPfK9xPBw0g1/social-images/social-1783960409642-im3.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/5kEVguQkw9NttDYdmPfK9xPBw0g1/social-images/social-1783960409642-im3.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
