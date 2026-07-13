import { createFileRoute } from "@tanstack/react-router";
import { LegalShell } from "@/components/LegalShell";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Centre Hélicicole Meye" },
      { name: "description", content: "Informations légales du Centre Hélicicole Meye (C.H.M) à Yaoundé." },
      { property: "og:title", content: "Mentions légales — C.H.M" },
      { property: "og:description", content: "Éditeur, hébergement et propriété intellectuelle du site." },
      { property: "og:url", content: "/mentions-legales" },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalShell eyebrow="Informations légales" title="Mentions légales" updated="14 juillet 2026">
      <section>
        <h2 className="font-serif text-2xl text-forest-deep">Éditeur du site</h2>
        <p className="mt-3">
          <strong>Centre Hélicicole Meye (C.H.M)</strong><br />
          Directeur fondateur&nbsp;: MEYE ME ZO'O Daniel<br />
          Adresse&nbsp;: Messamendongo, Yaoundé — Cameroun<br />
          Téléphones&nbsp;: 699 53 47 29 / 674 67 49 02<br />
          Facebook&nbsp;:{" "}
          <a href="https://facebook.com/centrehelicicolemeye" target="_blank" rel="noreferrer" className="text-terracotta underline">
            facebook.com/centrehelicicolemeye
          </a>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">Directeur de la publication</h2>
        <p className="mt-3">MEYE ME ZO'O Daniel, en qualité de directeur fondateur du C.H.M.</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">Hébergement</h2>
        <p className="mt-3">
          Ce site est hébergé sur une infrastructure Cloud sécurisée. Les
          coordonnées précises de l'hébergeur peuvent être obtenues sur simple
          demande écrite auprès de l'éditeur.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">Propriété intellectuelle</h2>
        <p className="mt-3">
          L'ensemble des contenus (textes, images, logos, vidéos) présents sur
          ce site est la propriété exclusive du Centre Hélicicole Meye, sauf
          mention contraire. Toute reproduction ou représentation, totale ou
          partielle, sans autorisation écrite préalable est interdite.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">Responsabilité</h2>
        <p className="mt-3">
          Les informations diffusées sur ce site sont fournies à titre indicatif.
          Le C.H.M ne saurait être tenu responsable des erreurs, omissions ou
          des résultats obtenus par l'usage de ces informations.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">Contact</h2>
        <p className="mt-3">
          Pour toute question relative à ces mentions légales, contactez-nous
          au 699 53 47 29 ou via le formulaire de la page d'accueil.
        </p>
      </section>
    </LegalShell>
  );
}
