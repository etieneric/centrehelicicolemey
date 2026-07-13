import { createFileRoute } from "@tanstack/react-router";
import { LegalShell } from "@/components/LegalShell";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Politique de cookies — Centre Hélicicole Meye" },
      { name: "description", content: "Utilisation des cookies sur le site du Centre Hélicicole Meye." },
      { property: "og:title", content: "Politique de cookies — C.H.M" },
      { property: "og:description", content: "Types de cookies utilisés et comment les gérer." },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalShell eyebrow="Traçage" title="Politique de cookies" updated="14 juillet 2026">
      <p>
        Cette page explique comment le site du <strong>Centre Hélicicole Meye</strong>
        {" "}utilise des cookies et technologies similaires, ainsi que la manière
        dont vous pouvez les gérer.
      </p>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">Qu'est-ce qu'un cookie&nbsp;?</h2>
        <p className="mt-3">
          Un cookie est un petit fichier texte déposé sur votre appareil lors
          de la visite d'un site web. Il permet notamment d'assurer le bon
          fonctionnement du site et d'améliorer votre expérience.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">Cookies utilisés</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Cookies strictement nécessaires</strong> — indispensables au
            fonctionnement du site (navigation, sécurité).
          </li>
          <li>
            <strong>Cookies tiers</strong> — déposés par des services externes
            intégrés à ce site, comme les lecteurs vidéo YouTube et les cartes
            OpenStreetMap, lorsque vous consultez ces contenus.
          </li>
        </ul>
        <p className="mt-3">
          Ce site n'utilise pas de cookies publicitaires ni de traceurs
          marketing.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">Gestion des cookies</h2>
        <p className="mt-3">
          Vous pouvez à tout moment configurer votre navigateur pour accepter,
          refuser ou supprimer les cookies. La procédure exacte dépend de
          votre navigateur (Chrome, Firefox, Safari, Edge…) et est décrite
          dans son aide en ligne.
        </p>
        <p className="mt-3">
          Le refus des cookies strictement nécessaires peut affecter le bon
          fonctionnement de certaines pages.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">Contact</h2>
        <p className="mt-3">
          Pour toute question sur cette politique, contactez le C.H.M au
          699 53 47 29 ou via le formulaire de contact.
        </p>
      </section>
    </LegalShell>
  );
}
