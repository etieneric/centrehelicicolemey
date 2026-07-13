import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Phone, MapPin, Mail, Facebook, Youtube, Menu, X, Leaf,
  Shell, Egg, Sprout, GraduationCap, Users, Award, ArrowRight,
  PlayCircle, ChevronRight,
} from "lucide-react";

import logoAsset from "@/assets/logo.jpeg.asset.json";
import founderAsset from "@/assets/founder.png.asset.json";
import snailsAsset from "@/assets/snails.jpg.asset.json";
import im1Asset from "@/assets/im1.jpg.asset.json";
import im2Asset from "@/assets/im2.jpg.asset.json";
import im3Asset from "@/assets/im3.jpg.asset.json";
import im4Asset from "@/assets/im4.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: snailsAsset.url },
      { name: "twitter:image", content: snailsAsset.url },
    ],
  }),
  component: Index,
});

const PHONE_1 = "699 53 47 29";
const PHONE_2 = "674 67 49 02";
const YOUTUBE_URL = "https://www.youtube.com/channel/UC_KpRmZCEQKcykn7XS4oGUw";
const FACEBOOK_URL = "https://facebook.com/centrehelicicolemeye";

const NAV = [
  { label: "Accueil", href: "#accueil" },
  { label: "Formations", href: "#formations" },
  { label: "Produits", href: "#produits" },
  { label: "Pharmacopée", href: "#pharmacopee" },
  { label: "Vidéos", href: "#videos" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "pt-2" : "pt-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass-nav flex items-center justify-between rounded-full px-4 py-2.5 md:px-6">
          <a href="#accueil" className="flex items-center gap-2.5">
            <img src={logoAsset.url} alt="Logo C.H.M" className="h-10 w-10 rounded-full object-cover ring-1 ring-forest/20" />
            <div className="leading-tight">
              <div className="font-serif text-lg font-semibold text-forest-deep">C.H.M</div>
              <div className="hidden text-[10px] uppercase tracking-widest text-muted-foreground md:block">Centre Hélicicole Meye</div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-forest-deep/80 transition hover:text-terracotta">
                {l.label}
              </a>
            ))}
          </nav>

          <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="btn-primary hidden md:inline-flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" />
            Appeler le {PHONE_1}
          </a>

          <button onClick={() => setOpen(!open)} className="rounded-full p-2 text-forest-deep lg:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="glass-nav mt-2 flex flex-col gap-1 rounded-3xl p-4 lg:hidden">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="rounded-2xl px-4 py-3 text-sm font-medium text-forest-deep hover:bg-cream-deep">
                {l.label}
              </a>
            ))}
            <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="btn-primary mt-2 justify-center inline-flex items-center gap-2">
              <Phone className="h-4 w-4" /> {PHONE_1}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Organic background shapes */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-forest/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-terracotta/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <span className="eyebrow inline-flex items-center gap-2">
              <Leaf className="h-3.5 w-3.5" /> Messamendongo · Yaoundé · Cameroun
            </span>
            <h1 className="mt-5 text-4xl leading-[1.05] text-forest-deep md:text-6xl lg:text-7xl">
              L'Excellence de l'<em className="not-italic text-terracotta">Héliciculture</em> au Cameroun avec Daniel Meye.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Pionnier de l'élevage des Escargots Géants d'Afrique, formateur et
              expert en agro-écologie urbaine à Messamendongo.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#formations" className="btn-primary inline-flex items-center gap-2">
                Découvrir nos formations <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-terracotta inline-flex items-center gap-2">
                Nous contacter
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
              {[
                { k: "10+", v: "Ans d'expertise" },
                { k: "🏆", v: "Grand Prix d'Excellence" },
                { k: "1000+", v: "Jeunes formés" },
              ].map((s) => (
                <div key={s.v} className="shell-card p-4 md:p-5">
                  <div className="font-serif text-2xl text-forest-deep md:text-3xl">{s.k}</div>
                  <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal lg:col-span-5">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-forest/10">
                <img src={snailsAsset.url} alt="Escargots géants d'Afrique du Centre Hélicicole Meye" className="h-[520px] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-deep/70 to-transparent" />
              </div>
              <div className="absolute -bottom-8 -left-6 w-44 overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-cream md:w-52">
                <img src={founderAsset.url} alt="MEYE ME ZO'O Daniel, fondateur du C.H.M" className="h-56 w-full object-cover md:h-64" />
              </div>
              <div className="absolute -right-4 top-6 rounded-2xl bg-cream/90 px-4 py-3 backdrop-blur shell-card">
                <div className="text-[10px] uppercase tracking-widest text-terracotta">Fondateur</div>
                <div className="font-serif text-sm text-forest-deep">Daniel Meye</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Productions() {
  const items = [
    { icon: Shell, title: "Chair d'Escargots Géants", desc: "Fraîche ou transformée, issue d'élevages sélectionnés selon les meilleures pratiques héliciculteurs." },
    { icon: Egg, title: "Œufs d'Escargots", desc: "Pour la gastronomie fine et la reproduction : géniteurs de qualité pour lancer votre élevage." },
    { icon: Sprout, title: "Coquilles d'Escargots", desc: "Valorisées pour l'industrie, l'artisanat et l'amendement des sols en agriculture biologique." },
    { icon: Leaf, title: "Matériel & Géniteurs", desc: "Kits d'élevage, géniteurs sélectionnés et accompagnement technique de démarrage." },
  ];
  return (
    <section id="produits" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <span className="eyebrow">Productions & Expertise</span>
          <h2 className="section-title mt-3">Une filière complète, du géniteur à la table.</h2>
          <p className="mt-4 text-muted-foreground">
            Le Centre Hélicicole Meye maîtrise chaque étape de la chaîne de valeur
            de l'escargot géant africain (<em>Achatina</em>), pour une production
            durable et rentable.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <article key={it.title} className="shell-card group flex flex-col p-7 transition hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-cream transition group-hover:bg-terracotta">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-forest-deep">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Formations() {
  return (
    <section id="formations" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="overflow-hidden rounded-[2.5rem] ring-1 ring-forest/10 shadow-xl">
                <img src={im1Asset.url} alt="Formation pratique au Centre Hélicicole Meye" className="h-[420px] w-full object-cover md:h-[520px]" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden w-56 overflow-hidden rounded-3xl ring-4 ring-cream shadow-xl md:block">
                <img src={im3Asset.url} alt="Interview de Daniel Meye" className="h-40 w-full object-cover" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="eyebrow">Formation & Impact Social</span>
            <h2 className="section-title mt-3">Centre de Formation Pratique.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Un lieu vivant dédié à l'autonomisation des femmes et des jeunes de
              Yaoundé, où se transmettent les techniques modernes d'élevage
              d'escargots, alliées à la foresterie urbaine et à la gestion
              écologique des déchets.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: GraduationCap, title: "Techniques modernes d'héliciculture", desc: "Sélection, alimentation, cycles de reproduction et sanitaire." },
                { icon: Users, title: "Autonomisation femmes & jeunes", desc: "Parcours accompagnés vers l'entrepreneuriat vert et l'installation." },
                { icon: Sprout, title: "Foresterie urbaine & compost", desc: "Valorisation des déchets organiques en ressource pour l'élevage." },
                { icon: Award, title: "Certification pratique", desc: "Attestation de fin de formation reconnue localement." },
              ].map((f) => (
                <li key={f.title} className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-serif text-lg text-forest-deep">{f.title}</div>
                    <div className="text-sm text-muted-foreground">{f.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn-primary mt-10 inline-flex items-center gap-2">
              Rejoindre une session <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pharmacopee() {
  return (
    <section id="pharmacopee" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest to-forest-deep" />
      {/* Botanical decoration */}
      <svg className="pointer-events-none absolute -left-10 top-10 h-72 w-72 text-cream/10" viewBox="0 0 200 200" fill="currentColor" aria-hidden>
        <path d="M100 10c20 40 60 60 90 70-30 10-70 30-90 70-20-40-60-60-90-70 30-10 70-30 90-70z" />
      </svg>
      <svg className="pointer-events-none absolute -right-10 bottom-10 h-96 w-96 text-terracotta/10" viewBox="0 0 200 200" fill="currentColor" aria-hidden>
        <circle cx="100" cy="100" r="80" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 text-cream">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow text-terracotta-soft">Pharmacopée traditionnelle</span>
            <h2 className="mt-3 font-serif text-4xl leading-tight md:text-6xl">
              Le Pouvoir de la <em className="not-italic text-terracotta-soft">Nature</em>.
            </h2>
            <p className="mt-6 max-w-xl text-cream/80">
              Fort de décennies d'observation de la forêt équatoriale, Daniel
              Meye cultive et transmet une pharmacopée vivante&nbsp;: écorces
              nobles, feuilles rares, racines et plantes médicinales grandissent
              au cœur même du système écologique du Centre.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Écorces forestières", d: "Sélection minutieuse d'écorces aux vertus reconnues." },
                { t: "Plantes médicinales", d: "Cultivées sans intrant chimique dans le jardin du centre." },
                { t: "Préparations traditionnelles", d: "Savoir-faire hérité et documenté avec rigueur." },
                { t: "Écosystème intégré", d: "Symbiose entre élevage, forêt et pharmacopée." },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl border border-cream/15 bg-cream/5 p-5 backdrop-blur">
                  <div className="font-serif text-lg">{c.t}</div>
                  <div className="mt-1 text-sm text-cream/70">{c.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[2.5rem] ring-1 ring-cream/20">
              <img src={im2Asset.url} alt="Récolte d'escargots — pharmacopée et nature" className="h-[520px] w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Videos() {
  const thumbs = [
    { title: "Visite du Centre Hélicicole Meye", img: im1Asset.url, duration: "12:04" },
    { title: "Élevage des Achatina — techniques", img: snailsAsset.url, duration: "08:47" },
    { title: "Interview du fondateur Daniel Meye", img: im3Asset.url, duration: "15:22" },
    { title: "Cérémonie & Grand Prix d'Excellence", img: im4Asset.url, duration: "06:31" },
    { title: "Formation des jeunes à Messamendongo", img: im2Asset.url, duration: "10:15" },
    { title: "Pharmacopée traditionnelle du C.H.M", img: founderAsset.url, duration: "09:58" },
  ];
  return (
    <section id="videos" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Chaîne YouTube</span>
            <h2 className="section-title mt-3">C.H.M en Vidéo.</h2>
            <p className="mt-4 text-muted-foreground">
              Découvrez les coulisses du Centre, les formations et les récoltes.
              Abonnez-vous à <span className="font-medium text-forest-deep">@c.h.mcentrehelicicolemeye8908</span>.
            </p>
          </div>
          <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="btn-terracotta inline-flex items-center gap-2">
            <Youtube className="h-4 w-4" /> S'abonner pour apprendre gratuitement
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {thumbs.map((v, i) => (
            <a key={i} href={YOUTUBE_URL} target="_blank" rel="noreferrer"
               className="group block overflow-hidden rounded-3xl bg-card shadow-md ring-1 ring-forest/5 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-video overflow-hidden">
                <img src={v.img} alt={v.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-forest-deep/20 transition group-hover:bg-forest-deep/40" />
                <PlayCircle className="absolute inset-0 m-auto h-16 w-16 text-cream drop-shadow-xl transition group-hover:scale-110" strokeWidth={1.25} />
                <span className="absolute bottom-3 right-3 rounded-md bg-forest-deep/80 px-2 py-0.5 text-xs font-medium text-cream">{v.duration}</span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg leading-snug text-forest-deep line-clamp-2">{v.title}</h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <img src={logoAsset.url} alt="" className="h-5 w-5 rounded-full object-cover" />
                  Centre Hélicicole Meye
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">Contact & Localisation</span>
            <h2 className="section-title mt-3">Rencontrons-nous à Messamendongo.</h2>
            <p className="mt-4 text-muted-foreground">
              Partenariats, formations, commandes&nbsp;: notre équipe vous
              répond avec plaisir.
            </p>

            <div className="mt-8 space-y-4">
              <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="shell-card flex items-center gap-4 p-5 transition hover:bg-cream-deep">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-cream"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Ligne principale</div>
                  <div className="font-serif text-lg text-forest-deep">{PHONE_1}</div>
                </div>
              </a>
              <a href={`tel:${PHONE_2.replace(/\s/g, "")}`} className="shell-card flex items-center gap-4 p-5 transition hover:bg-cream-deep">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta text-cream"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Ligne secondaire</div>
                  <div className="font-serif text-lg text-forest-deep">{PHONE_2}</div>
                </div>
              </a>
              <div className="shell-card flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-deep text-cream"><MapPin className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Adresse</div>
                  <div className="font-serif text-lg text-forest-deep">Messamendongo, Yaoundé — Cameroun</div>
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-forest/10 shadow-md">
              <iframe
                title="Carte Messamendongo Yaoundé"
                src="https://www.openstreetmap.org/export/embed.html?bbox=11.55%2C3.83%2C11.65%2C3.93&layer=mapnik&marker=3.88%2C11.60"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="shell-card p-8 md:p-10">
              <h3 className="font-serif text-2xl text-forest-deep">Demande de partenariat ou de formation</h3>
              <p className="mt-2 text-sm text-muted-foreground">Nous vous répondons sous 48h.</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Nom complet" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Téléphone" name="phone" />
                <Field label="Sujet" name="subject" required />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Votre message</label>
                <textarea required rows={5}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20" />
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">En envoyant ce formulaire, vous acceptez d'être recontacté(e) par le C.H.M.</p>
                <button type="submit" className="btn-primary inline-flex items-center gap-2">
                  Envoyer <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {sent && (
                <div className="mt-6 rounded-2xl border border-forest/20 bg-forest/5 p-4 text-sm text-forest-deep">
                  Merci ! Votre message a bien été enregistré. Nous vous recontactons rapidement.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} required={required}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-forest-deep py-14 text-cream">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="Logo C.H.M" className="h-12 w-12 rounded-full object-cover ring-2 ring-cream/20" />
              <div>
                <div className="font-serif text-xl">Centre Hélicicole Meye</div>
                <div className="text-xs uppercase tracking-widest text-cream/60">C.H.M · Yaoundé</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70">
              L'excellence de l'héliciculture camerounaise&nbsp;: élevage,
              formations, pharmacopée traditionnelle et agro-écologie urbaine à
              Messamendongo.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition hover:bg-terracotta">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition hover:bg-terracotta">
                <Youtube className="h-4 w-4" />
              </a>
              <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} aria-label="Téléphone"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition hover:bg-terracotta">
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-cream/50">Navigation</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((l) => (
                <li key={l.href}><a href={l.href} className="text-cream/80 hover:text-terracotta-soft">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-cream/50">Contact</div>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Messamendongo, Yaoundé — Cameroun</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> {PHONE_1}</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> {PHONE_2}</li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /> contact@centrehelicicolemeye.cm</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 md:flex-row">
          <div>© {new Date().getFullYear()} Centre Hélicicole Meye. Tous droits réservés.</div>
          <div>Fait avec passion à Yaoundé, Cameroun.</div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Productions />
      <Formations />
      <Pharmacopee />
      <Videos />
      <Contact />
      <Footer />
    </main>
  );
}
