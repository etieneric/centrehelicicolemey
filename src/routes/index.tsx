import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Phone, MapPin, Mail, Facebook, Youtube, Menu, X, Leaf,
  Shell, Egg, Sprout, GraduationCap, Users, Award, ArrowRight,
  PlayCircle, ChevronRight, Baby, HeartPulse, Sparkles, Dumbbell,
  Droplet, Coins, HandHeart, Globe2,
} from "lucide-react";

// Importations d'images physiques directes nettoyées
import logoAsset from "@/assets/logo.jpeg";
import founderAsset from "@/assets/founder.png";
import snailsAsset from "@/assets/snails.jpg";
import im1Asset from "@/assets/im1.jpg";
import im2Asset from "@/assets/im2.jpg";
import im3Asset from "@/assets/im3.jpg";
import im4Asset from "@/assets/im4.jpg";
import archachatinaAsset from "@/assets/variete-1.png";
import achatinaAchatinaAsset from "@/assets/variete-2.png";
import achatinaFulicaAsset from "@/assets/variete-3.png";
import oeufsAsset from "@/assets/oeufs.png";
import bannerAsset from "@/assets/chm-banner.jpeg";
import ima6Asset from "@/assets/ima6.jpg";
import ima7Asset from "@/assets/ima7.jpg";
import ima8Asset from "@/assets/ima8.jpg";
import ima9Asset from "@/assets/ima9.jpg";

import { getChannelVideos, type YoutubeVideo } from "@/lib/youtube.functions";
import { supabase } from "@/integrations/supabase/client";
import { Events } from "@/components/public/Events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: snailsAsset },
      { name: "twitter:image", content: snailsAsset },
      // Intégration de la balise HTML de validation Google Search Console
      { name: "google-site-verification", content: "uTh1EZQwn9qwr7d5E8PDhwEJ4iBIZ8ZqSP2FujU09Ww" },
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
  { label: "Fondateur", href: "#fondateur" },
  { label: "Variétés", href: "#varietes" },
  { label: "Formations", href: "#formations" },
  { label: "Produits", href: "#produits" },
  { label: "Pharmacopée", href: "#pharmacopee" },
  { label: "Vidéos", href: "#videos" },
  { label: "Événements", href: "#evenements" },
  { label: "Galerie", href: "#galerie" },
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
            <img src={logoAsset} alt="Logo C.H.M" className="h-10 w-10 rounded-full object-cover ring-1 ring-forest/20" />
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

          <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="btn-primary hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium shrink-0">
            <Phone className="h-3.5 w-3.5" />
            Appeler
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
            <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="btn-primary mt-2 justify-center inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium">
              <Phone className="h-3.5 w-3.5" /> Appeler
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
              expert en agro-écologie urbaine au Cameroun.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#formations" className="btn-primary inline-flex items-center gap-2">
                Découvrir nos formations <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-terracotta inline-flex items-center gap-2">
                Nous contacter
              </a>
            </div>

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
                <img src={snailsAsset} alt="Escargots géants d'Afrique du Centre Hélicicole Meye" className="h-[520px] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-deep/70 to-transparent" />
              </div>
              <div className="absolute -bottom-8 -left-6 w-44 overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-cream md:w-52">
                <img src={founderAsset} alt="MEYE ME ZO'O Daniel, fondateur du C.H.M" className="h-56 w-full object-cover md:h-64" />
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

function Varietes() {
  const varieties = [
    {
      img: archachatinaAsset,
      latin: "Archachatina marginata",
      nick: "Le « Gros Escargot Noir »",
      desc: "Le colosse de l'héliciculture au Cameroun. Grosse coquille à bout arrondi, chair très ferme et prisée. Idéal pour un élevage robuste.",
    },
    {
      img: achatinaAchatinaAsset,
      latin: "Achatina achatina",
      nick: "L'Escargot Tigre ou « Gros Rouge »",
      desc: "Le plus grand escargot terrestre au monde. Coquille pointue avec des zébrures jaunes-orangées. Excellent rendement de chair.",
    },
    {
      img: achatinaFulicaAsset,
      latin: "Achatina fulica",
      nick: "L'Escargot de Jardin",
      desc: "Croissance et reproduction ultra-rapides. Parfait pour démarrer rapidement sa production et multiplier son cheptel à moindre coût.",
    },
  ];

  const virtues = [
    { icon: Baby, title: "Accouchement & Gynécologie", desc: "Recommandé par les gynécologues pour faciliter l'accouchement." },
    { icon: HeartPulse, title: "Ulcère & Digestion", desc: "Les acides aminés de la chair contribuent à la reconstitution des tissus gastriques et à la guérison de l'ulcère d'estomac." },
    { icon: Dumbbell, title: "Richesse en Protéines", desc: "Teneur en protéines identique à celle du poulet — idéal contre les carences en fer (anémie) et en protéines." },
    { icon: Sprout, title: "Maigreur & Diététique", desc: "Très peu calorique : parfait pour les sportifs (récupération) et les personnes âgées." },
    { icon: Sparkles, title: "Bave d'Escargot — Beauté", desc: "Riche en collagène et élastine : élimine la cellulite, régénère la peau et embellit le teint." },
    { icon: Droplet, title: "Articulations & Régénération", desc: "Soulage les articulations, apaise les inflammations et favorise la cicatrisation cutanée." },
  ];

  return (
    <section id="varietes" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-cream to-cream-deep/40" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <span className="eyebrow">Nos Variétés, Bienfaits & Opportunités</span>
          <h2 className="section-title mt-3">Les 3 Variétés d'Escargots Géants d'Afrique cultivés au Cameroun.</h2>
          <p className="mt-4 text-muted-foreground">
            Trois espèces emblématiques, sélectionnées pour leur robustesse,
            leur rendement et leur adaptation au climat équatorial camerounais.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {varieties.map((v, i) => (
            <article
              key={v.latin}
              className="shell-card group overflow-hidden p-0 transition duration-500 hover:-translate-y-2"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={v.img}
                  alt={`${v.latin} — ${v.nick}`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-forest-deep/10 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-forest-deep backdrop-blur">
                  Variété {i + 1}
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-serif text-2xl italic text-forest-deep">{v.latin}</h3>
                <div className="mt-1 text-sm font-medium text-terracotta">{v.nick}</div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <figure className="mt-14 grid gap-8 overflow-hidden rounded-[2rem] border border-forest/10 bg-card md:grid-cols-2">
          <div className="relative h-72 md:h-full">
            <img
              src={oeufsAsset}
              alt="Œufs d'escargot géant africain en phase de ponte"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="flex flex-col justify-center p-8 md:p-10">
            <span className="eyebrow">Œufs & Reproduction</span>
            <h3 className="mt-3 font-serif text-2xl text-forest-deep md:text-3xl">
              Une ponte abondante, gage d'un cheptel qui se multiplie.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Nos géniteurs pondent des grappes d'œufs nacrés dans une litière
              tempérée et humide. Une reproduction maîtrisée qui garantit un
              renouvellement continu du cheptel et une rentabilité durable de
              l'élevage.
            </p>
          </figcaption>
        </figure>

        <div className="mt-28 max-w-3xl">
          <span className="eyebrow">Vertus & Bienfaits</span>
          <h2 className="section-title mt-3">Les Vertus Exceptionnelles de l'Escargot Géant.</h2>
          <p className="mt-4 text-muted-foreground">
            Un aliment-médicament reconnu par la médecine traditionnelle et
            confirmé par la science moderne&nbsp;: de la maternité à la beauté
            de la peau, ses bienfaits touchent tout le corps.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {virtues.map((v) => (
            <div
              key={v.title}
              className="group relative overflow-hidden rounded-3xl border border-forest/10 bg-card p-7 transition hover:border-terracotta/40 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta transition group-hover:bg-terracotta group-hover:text-cream">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-serif text-xl text-forest-deep">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-terracotta/5 transition group-hover:bg-terracotta/10" />
            </div>
          ))}
        </div>

        <div className="relative mt-28 overflow-hidden rounded-[2.5rem]">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-forest via-forest-deep to-forest" />
          <svg className="pointer-events-none absolute -right-16 -top-16 h-96 w-96 text-terracotta/15" viewBox="0 0 200 200" fill="currentColor" aria-hidden>
            <circle cx="100" cy="100" r="80" />
          </svg>
          <svg className="pointer-events-none absolute -bottom-20 -left-10 h-80 w-80 text-cream/5" viewBox="0 0 200 200" fill="currentColor" aria-hidden>
            <path d="M100 10c20 40 60 60 90 70-30 10-70 30-90 70-20-40-60-60-90-70 30-10 70-30 90-70z" />
          </svg>

          <div className="relative grid gap-12 p-10 text-cream md:p-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-terracotta-soft backdrop-blur">
                <Coins className="h-3.5 w-3.5" /> Opportunité économique
              </div>
              <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                Une Opportunité Unique&nbsp;: <br />
                <span className="text-terracotta-soft">L'Élevage à 0 FCFA.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg text-cream/85">
                Générer des revenus grâce aux escargots géants d'Afrique{" "}
                <strong className="text-cream">avec 0 FCFA de budget de départ</strong>.
                Un modèle inclusif, écologique et rentable, à la portée de tous.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#formations" className="btn-terracotta inline-flex items-center gap-2">
                  Se former gratuitement <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-medium text-cream transition hover:bg-cream/10"
                >
                  Démarrer mon élevage <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-4 lg:col-span-5">
              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <Globe2 className="h-5 w-5 text-terracotta-soft" />
                  <div className="font-serif text-lg">Marché continental</div>
                </div>
                <p className="mt-2 text-sm text-cream/75">
                  Très consommé en Afrique de l'Ouest (Côte d'Ivoire, Nigeria,
                  Bénin) et partout sur le continent&nbsp;: une demande soutenue,
                  toute l'année.
                </p>
              </div>
              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <HandHeart className="h-5 w-5 text-terracotta-soft" />
                  <div className="font-serif text-lg">Impact social</div>
                </div>
                <p className="mt-2 text-sm text-cream/75">
                  Une activité dont la principale main-d'œuvre est constituée de
                  femmes. Elle génère des emplois durables et lutte activement
                  contre la pauvreté.
                </p>
              </div>
              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <Sprout className="h-5 w-5 text-terracotta-soft" />
                  <div className="font-serif text-lg">Zéro investissement</div>
                </div>
                <p className="mt-2 text-sm text-cream/75">
                  Récupération de géniteurs, matériaux locaux, alimentation
                  issue des déchets verts&nbsp;: un cycle vertueux qui démarre
                  sans capital.
                </p>
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
                <img src={im1Asset} alt="Formation pratique au Centre Hélicicole Meye" className="h-[420px] w-full object-cover md:h-[520px]" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden w-56 overflow-hidden rounded-3xl ring-4 ring-cream shadow-xl md:block">
                <img src={im3Asset} alt="Interview de Daniel Meye" className="h-40 w-full object-cover" />
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
                { t: "Préparations traditionnelles", d: "Savoir-faire hérité et documenté avec rigreu." },
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
              <img src={im2Asset} alt="Récolte d'escargots — pharmacopée et nature" className="h-[520px] w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric", month: "long", year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

function Videos() {
  const { data, isLoading, isError } = useQuery<YoutubeVideo[]>({
    queryKey: ["yt-videos"],
    queryFn: () => getChannelVideos(),
    staleTime: 1000 * 60 * 30,
  });

  const videos = data ?? [];

  return (
    <section id="videos" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow inline-flex items-center gap-2">
              <Youtube className="h-3.5 w-3.5" /> Notre chaîne YouTube
            </span>
            <h2 className="section-title mt-3">
              Découvrez nos <em className="not-italic text-forest">vidéos de terrain</em>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Formations, visites de fermes et témoignages — suivez le quotidien
              du Centre Hélicicole Meye directement sur notre chaîne{" "}
              <span className="font-medium text-forest-deep">@c.h.mcentrehelicicolemeye8908</span>.
            </p>
          </div>
          <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="btn-terracotta inline-flex items-center gap-2">
            <Youtube className="h-4 w-4" /> S'abonner pour apprendre gratuitement
          </a>
        </div>

        {isLoading && (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-3xl bg-card ring-1 ring-forest/5">
                <div className="aspect-video animate-pulse bg-cream-deep" />
                <div className="space-y-2 p-5">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-cream-deep" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-cream-deep" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && videos.length === 0 && (
          <div className="mt-14 shell-card p-10 text-center">
            <Youtube className="mx-auto h-10 w-10 text-terracotta" />
            <p className="mt-4 text-muted-foreground">
              {isError
                ? "Les vidéos ne peuvent pas être chargées pour le moment."
                : "Aucune vidéo disponible pour l'instant."}
            </p>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="btn-primary mt-6 inline-flex items-center gap-2">
              Visiter la chaîne <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}

        {videos.length > 0 && (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.slice(0, 9).map((v) => (
              <a key={v.id} href={v.url} target="_blank" rel="noreferrer"
                 className="group block overflow-hidden rounded-3xl bg-card shadow-md ring-1 ring-forest/5 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-forest-deep/20 transition group-hover:bg-forest-deep/40" />
                  <PlayCircle className="absolute inset-0 m-auto h-16 w-16 text-cream drop-shadow-xl transition group-hover:scale-110" strokeWidth={1.25} />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg leading-snug text-forest-deep line-clamp-2">{v.title}</h3>
                  <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <img src={logoAsset} alt="" className="h-5 w-5 rounded-full object-cover" />
                      Centre Hélicicole Meye
                    </span>
                    {v.published && <span>{formatDate(v.published)}</span>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
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

            <div className="mt-8 overflow-hidden rounded-3xl bg-cream ring-1 ring-forest/10 shadow-md">
              <img
                src={bannerAsset}
                alt="CHM-Cameroun"
                className="h-auto w-full object-contain"
                loading="lazy"
              />
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
              <img src={logoAsset} alt="Logo C.H.M" className="h-12 w-12 rounded-full object-cover ring-2 ring-cream/20" />
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/60 md:flex-row">
          <div>© {new Date().getFullYear()} Bimedia Connect Agency. Tous droits réservés.</div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="/confidentialite" className="hover:text-terracotta-soft">Confidentialité</a>
            <a href="/mentions-legales" className="hover:text-terracotta-soft">Mentions légales</a>
            <a href="/cookies" className="hover:text-terracotta-soft">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function Founder() {
  const pillars = [
    {
      icon: Shell,
      title: "Héliciculture",
      desc: "Une activité rentable et accessible, moteur de sécurité alimentaire et de création d'emplois.",
    },
    {
      icon: Sprout,
      title: "Gestion écologique des déchets",
      desc: "Les déchets organiques urbains deviennent une ressource nutritive pour les élevages.",
    },
    {
      icon: Leaf,
      title: "Foresterie urbaine",
      desc: "Plantation d'arbres et espaces verts pour restaurer la biodiversité en ville.",
    },
  ];

  return (
    <section id="fondateur" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-forest/5 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="relative">
                <div className="overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-forest/10">
                  <img
                    src={founderAsset}
                    alt="MEYE ME ZO'O Daniel, fondateur du Centre Hélicicole Meye"
                    className="h-[520px] w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden max-w-xs rounded-3xl bg-forest-deep p-6 text-cream shadow-xl md:block">
                  <div className="text-4xl leading-none text-terracotta-soft">“</div>
                  <p className="mt-1 font-serif text-lg leading-snug">
                    L'héliciculture est une opportunité encore largement
                    sous-exploitée en Afrique.
                  </p>
                  <div className="mt-3 text-xs uppercase tracking-widest text-cream/60">
                    Daniel Meye
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3">
                <div className="shell-card p-4 text-center">
                  <Award className="mx-auto h-5 w-5 text-terracotta" />
                  <div className="mt-2 font-serif text-sm text-forest-deep">Grand Prix</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Excellence Africaine</div>
                </div>
                <div className="shell-card p-4 text-center">
                  <Users className="mx-auto h-5 w-5 text-terracotta" />
                  <div className="mt-2 font-serif text-sm text-forest-deep">Femmes & Jeunes</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Autonomisation</div>
                </div>
                <div className="shell-card p-4 text-center">
                  <Leaf className="mx-auto h-5 w-5 text-terracotta" />
                  <div className="mt-2 font-serif text-sm text-forest-deep">Agro-écologie</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Yaoundé</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="eyebrow">Biographie & Vision du fondateur</span>
            <h2 className="section-title mt-3">
              MEYE ME ZO'O Daniel, pionnier de l'<em className="not-italic text-terracotta">héliciculture</em> camerounaise.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Acteur de l'autonomisation des femmes et des jeunes à Yaoundé,
              lauréat du Grand Prix d'Excellence Africaine en élevage des
              escargots, Daniel Meye a transformé une activité longtemps jugée
              marginale en un véritable moteur d'impact social et
              environnemental.
            </p>

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-forest-deep/85">
              <p>
                Directeur fondateur du <strong className="text-forest-deep">Centre Hélicicole Meye — Cameroun</strong>,
                il développe depuis plusieurs années des initiatives qui
                dépassent largement le cadre de la simple production
                agropastorale. Dans un contexte où l'entrepreneuriat agricole
                devient un levier essentiel de développement durable, il
                s'impose comme l'une des figures les plus innovantes de
                l'élevage d'escargots au Cameroun.
              </p>
              <p>
                Au cœur de Yaoundé, il mène un combat discret mais déterminant :
                initier les femmes et les jeunes aux techniques modernes
                d'élevage d'escargots et à la gestion de micro-projets
                agropastoraux. Objectif clair : leur permettre d'acquérir des
                compétences génératrices de revenus et de retrouver une
                stabilité de subsistance. Plusieurs bénéficiaires ont déjà
                lancé leurs propres exploitations.
              </p>
            </div>

            <div className="mt-10">
              <div className="eyebrow mb-4">Un modèle intégré, trois piliers</div>
              <div className="grid gap-4 sm:grid-cols-3">
                {pillars.map((p) => (
                  <div key={p.title} className="shell-card p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest/10 text-forest">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg text-forest-deep">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-forest-deep/85">
              <p>
                Ce système circulaire permet non seulement de produire des
                escargots destinés à la consommation et au commerce, mais aussi
                de réduire les déchets urbains et de contribuer à la
                reforestation en zone urbaine, pé-urbaine et rurale.
              </p>
              <p>
                Pour Daniel Meye, l'héliciculture — facile à mettre en œuvre,
                peu coûteuse et respectueuse de l'environnement — constitue une
                solution stratégique pour lutter contre le chômage et renforcer
                la sécurité alimentaire. À travers son centre, il ambitionne de
                former davantage de jeunes et de femmes, tout en développant
                des partenariats avec des institutions, ONG et collectivités
                locales.
              </p>
              <p className="border-l-2 border-terracotta pl-5 font-serif text-lg italic text-forest-deep">
                Son parcours illustrates comment innovation, engagement social et
                respect de l'environnement peuvent se conjuguer pour créer un
                impact durable — et démontre qu'un autre modèle de
                développement est possible.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#formations" className="btn-primary inline-flex items-center gap-2">
                Rejoindre une formation <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-terracotta inline-flex items-center gap-2">
                Devenir partenaire
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const defaults = [
    { src: ima6Asset, caption: "Conférence institutionnelle — présentation du C.H.M" },
    { src: ima7Asset, caption: "Formation & remise d'escargots aux femmes entrepreneures" },
    { src: ima8Asset, caption: "Stand du C.H.M lors d'un salon agropastoral à Yaoundé" },
    { src: ima9Asset, caption: "Récolte au centre — bassines d'escargots géants" },
    { src: im1Asset, caption: "Session de formation pratique" },
    { src: im2Asset, caption: "Pharmacopée & valorisation naturelle" },
    { src: im3Asset, caption: "Interview de Daniel Meye" },
    { src: im4Asset, caption: "Vie du centre hélicicole" },
  ];
  const { data: remote } = useQuery({
    queryKey: ["public-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_photos")
        .select("image_url, caption")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
  const photos = remote && remote.length > 0
    ? remote.map((p) => ({ src: p.image_url, caption: p.caption ?? "" }))
    : defaults;
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, photos.length]);

  return (
    <section id="galerie" className="bg-cream-deep/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <span className="eyebrow">Galerie photo</span>
          <h2 className="section-title mt-3">Événements, formations & activités du C.H.M</h2>
          <p className="mt-4 text-muted-foreground">
            Retour en images sur les conférences, formations et moments forts
            du Centre Hélicicole Meye. Cliquez sur une photo pour l'afficher en plein écran.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-cream ring-1 ring-forest/10 shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                <p className="text-xs text-cream line-clamp-2">{p.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-deep/95 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/30 backdrop-blur hover:bg-cream/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Précédent"
            onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)); }}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/30 backdrop-blur hover:bg-cream/20 md:left-6"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Suivant"
            onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? i : (i + 1) % photos.length)); }}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/30 backdrop-blur hover:bg-cream/20 md:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <figure
            className="flex max-h-full max-w-6xl flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[open].src}
              alt={photos[open].caption}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="max-w-2xl text-center text-sm text-cream/90">
              {photos[open].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Founder />
      <Varietes />
      <Productions />
      <Formations />
      <Pharmacopee />
      <Videos />
      <Events />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
