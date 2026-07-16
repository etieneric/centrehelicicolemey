import { useQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type EventRow = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  event_type: string;
  cover_image_url: string | null;
  contact_link: string | null;
};

const TYPE_LABELS: Record<string, string> = {
  formation: "Formation",
  seminaire: "Séminaire",
  visite: "Visite",
  autre: "Événement",
};

async function fetchUpcoming(): Promise<EventRow[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true })
    .limit(12);
  if (error) throw error;
  return (data ?? []) as EventRow[];
}

function normalizeContact(link: string): string {
  if (/^https?:\/\//i.test(link)) return link;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(link)) return `mailto:${link}`;
  if (/^[+\d][\d\s().-]{5,}$/.test(link)) return `tel:${link.replace(/\s/g, "")}`;
  return link;
}

export function Events() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["public-events"],
    queryFn: fetchUpcoming,
  });

  if (!isLoading && events.length === 0) return null;

  return (
    <section id="evenements" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream-deep/30 via-cream to-cream" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <span className="eyebrow inline-flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Événements à venir</span>
          <h2 className="section-title mt-3">Formations, séminaires et visites au C.H.M</h2>
          <p className="mt-4 text-muted-foreground">
            Retrouvez nos prochaines sessions de formation, conférences et visites du centre.
            Réservez votre place en nous contactant.
          </p>
        </div>

        {isLoading ? (
          <p className="mt-10 text-sm text-muted-foreground">Chargement des événements…</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => (
              <article key={ev.id} className="shell-card group flex flex-col overflow-hidden p-0 transition duration-500 hover:-translate-y-1">
                {ev.cover_image_url ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={ev.cover_image_url} alt={ev.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-forest-deep backdrop-blur">
                      {TYPE_LABELS[ev.event_type] ?? ev.event_type}
                    </span>
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-forest to-forest-deep">
                    <span className="rounded-full bg-cream/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cream">
                      {TYPE_LABELS[ev.event_type] ?? ev.event_type}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl text-forest-deep">{ev.title}</h3>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-terracotta" />
                      {new Date(ev.event_date).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
                    </div>
                    {ev.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-terracotta" /> {ev.location}
                      </div>
                    )}
                  </div>
                  {ev.description && (
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-forest-deep/80">{ev.description}</p>
                  )}
                  {ev.contact_link && (
                    <a
                      href={normalizeContact(ev.contact_link)}
                      target={/^https?:/i.test(ev.contact_link) ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="btn-terracotta mt-5 inline-flex w-fit items-center gap-2 text-xs"
                    >
                      S'inscrire / Contact <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
