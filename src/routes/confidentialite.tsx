import { createFileRoute } from "@tanstack/react-router";
import { LegalShell } from "@/components/LegalShell";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Centre Hélicicole Meye" },
      { name: "description", content: "Comment le Centre Hélicicole Meye collecte, utilise et protège vos données personnelles." },
      { property: "og:title", content: "Politique de confidentialité — C.H.M" },
      { property: "og:description", content: "Nos engagements sur la protection de vos données personnelles." },
      { property: "og:url", content: "/confidentialite" },
    ],
    links: [{ rel: "canonical", href: "/confidentialite" }],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalShell eyebrow="Vie privée" title="Politique de confidentialité" updated="14 juillet 2026">
      <p>
        Cette page décrit comment le <strong>Centre Hélicicole Meye (C.H.M)</strong>,
        situé à Messamendongo-Yaoundé (Cameroun), collecte, utilise et protège
        les données personnelles des visiteurs et des personnes qui nous
        contactent via ce site.
      </p>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">1. Responsable du traitement</h2>
        <p className="mt-3">
          Centre Hélicicole Meye — Messamendongo, Yaoundé, Cameroun. Contact&nbsp;:
          699 53 47 29 / 674 67 49 02.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">2. Données collectées</h2>
        <p className="mt-3">
          Nous collectons uniquement les données que vous nous transmettez
          volontairement via le formulaire de contact&nbsp;: nom, adresse
          e-mail, numéro de téléphone, sujet et contenu de votre message.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">3. Finalités</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Répondre à vos demandes d'information, de formation ou de partenariat.</li>
          <li>Assurer le suivi de nos échanges commerciaux et pédagogiques.</li>
          <li>Améliorer la qualité de nos services.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">4. Conservation</h2>
        <p className="mt-3">
          Vos données sont conservées le temps nécessaire au traitement de
          votre demande, puis archivées ou supprimées conformément à nos
          obligations légales.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">5. Partage</h2>
        <p className="mt-3">
          Vos données ne sont ni vendues ni cédées à des tiers. Elles peuvent
          être transmises à nos prestataires techniques strictement nécessaires
          au fonctionnement du site.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-forest-deep">6. Vos droits</h2>
        <p className="mt-3">
          Vous disposez d'un droit d'accès, de rectification, de suppression
          et d'opposition sur vos données. Pour l'exercer, contactez-nous au
          699 53 47 29 ou via le formulaire du site.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        Ce contenu est fourni à titre informatif et peut être complété par le
        Centre Hélicicole Meye à tout moment.
      </p>
    </LegalShell>
  );
}
