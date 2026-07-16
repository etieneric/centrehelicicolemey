import { useState, type FormEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Trash2, Pencil, X, Upload, CalendarDays, MapPin, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { saveEvent, deleteEvent } from "@/lib/events.functions";

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
  autre: "Autre",
};

async function fetchEvents(): Promise<EventRow[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });
  if (error) throw error;
  return (data ?? []) as EventRow[];
}

export function EventsManager() {
  const qc = useQueryClient();
  const save = useServerFn(saveEvent);
  const del = useServerFn(deleteEvent);

  const { data: events = [], isLoading } = useQuery({ queryKey: ["admin-events"], queryFn: fetchEvents });
  const [editing, setEditing] = useState<EventRow | null>(null);
  const [showForm, setShowForm] = useState(false);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-events"] });
    qc.invalidateQueries({ queryKey: ["public-events"] });
  };

  const saveMut = useMutation({
    mutationFn: (fd: FormData) => save({ data: fd }),
    onSuccess: () => {
      setEditing(null);
      setShowForm(false);
      invalidate();
    },
  });
  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: invalidate,
  });

  function startEdit(ev: EventRow) {
    setEditing(ev);
    setShowForm(true);
  }
  function startNew() {
    setEditing(null);
    setShowForm(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg text-forest-deep">Événements ({events.length})</h2>
        {!showForm && (
          <button onClick={startNew} className="btn-primary text-sm">+ Nouvel événement</button>
        )}
      </div>

      {showForm && (
        <EventForm
          initial={editing}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          onSubmit={(fd) => saveMut.mutate(fd)}
          submitting={saveMut.isPending}
          error={saveMut.error instanceof Error ? saveMut.error.message : null}
        />
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Chargement…</p>
      ) : events.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun événement pour l'instant.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {events.map((ev) => (
            <li key={ev.id} className="shell-card overflow-hidden p-0">
              {ev.cover_image_url && (
                <div className="aspect-[16/9] overflow-hidden bg-cream-deep">
                  <img src={ev.cover_image_url} alt={ev.title} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block rounded-full bg-terracotta/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-terracotta">
                      {TYPE_LABELS[ev.event_type] ?? ev.event_type}
                    </span>
                    <h3 className="mt-2 font-serif text-lg text-forest-deep">{ev.title}</h3>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(ev)} className="rounded-full p-1.5 text-forest-deep hover:bg-cream-deep" aria-label="Éditer">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => confirm("Supprimer cet événement ?") && delMut.mutate(ev.id)}
                      className="rounded-full bg-destructive/10 p-1.5 text-destructive hover:bg-destructive hover:text-cream"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {new Date(ev.event_date).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}</div>
                  {ev.location && <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {ev.location}</div>}
                  {ev.contact_link && <div className="flex items-center gap-1.5 truncate"><LinkIcon className="h-3.5 w-3.5" /> <span className="truncate">{ev.contact_link}</span></div>}
                </div>
                {ev.description && <p className="mt-3 text-sm text-forest-deep/80 line-clamp-3">{ev.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EventForm({
  initial,
  onCancel,
  onSubmit,
  submitting,
  error,
}: {
  initial: EventRow | null;
  onCancel: () => void;
  onSubmit: (fd: FormData) => void;
  submitting: boolean;
  error: string | null;
}) {
  function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit(fd);
  }

  const defaultDate = initial ? new Date(initial.event_date).toISOString().slice(0, 16) : "";

  return (
    <form onSubmit={handle} className="shell-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg text-forest-deep">
          {initial ? "Modifier l'événement" : "Nouvel événement"}
        </h3>
        <button type="button" onClick={onCancel} className="rounded-full p-1.5 text-muted-foreground hover:bg-cream-deep">
          <X className="h-4 w-4" />
        </button>
      </div>
      {initial && <input type="hidden" name="id" value={initial.id} />}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Titre" name="title" defaultValue={initial?.title ?? ""} required />
        <Field label="Type" name="event_type" as="select" defaultValue={initial?.event_type ?? "formation"}>
          <option value="formation">Formation</option>
          <option value="seminaire">Séminaire</option>
          <option value="visite">Visite</option>
          <option value="autre">Autre</option>
        </Field>
        <Field label="Date & heure" name="event_date" type="datetime-local" defaultValue={defaultDate} required />
        <Field label="Lieu" name="location" defaultValue={initial?.location ?? ""} />
        <Field label="Lien contact / inscription" name="contact_link" defaultValue={initial?.contact_link ?? ""} placeholder="https://… ou email/tel" />
        <label className="md:col-span-1">
          <span className="text-sm font-medium text-forest-deep">
            Image de couverture {initial?.cover_image_url && <span className="text-xs text-muted-foreground">(garder si vide)</span>}
          </span>
          <div className="mt-2 flex items-center gap-2">
            <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-forest/20 bg-white px-4 py-3 text-xs text-muted-foreground hover:border-terracotta">
              <Upload className="h-4 w-4" /> Choisir…
              <input type="file" name="cover" accept="image/*" hidden />
            </label>
            {initial?.cover_image_url && (
              <img src={initial.cover_image_url} alt="" className="h-12 w-16 rounded-lg object-cover" />
            )}
          </div>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-forest-deep">Description</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={initial?.description ?? ""}
          className="mt-2 w-full rounded-2xl border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus:border-terracotta"
        />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-full border border-forest/15 px-4 py-2 text-sm">Annuler</button>
        <button type="submit" disabled={submitting} className="btn-primary text-sm disabled:opacity-50">
          {submitting ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  as,
  children,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  as?: "select";
  children?: React.ReactNode;
}) {
  const cls = "mt-2 w-full rounded-2xl border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus:border-terracotta";
  return (
    <label className="block">
      <span className="text-sm font-medium text-forest-deep">{label}{required && " *"}</span>
      {as === "select" ? (
        <select name={name} defaultValue={defaultValue} className={cls}>{children}</select>
      ) : (
        <input type={type} name={name} required={required} defaultValue={defaultValue} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}
