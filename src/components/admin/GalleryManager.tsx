import { useState, type FormEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUp, ArrowDown, Trash2, Save, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  uploadGalleryPhoto,
  updateGalleryPhoto,
  reorderGalleryPhoto,
  deleteGalleryPhoto,
} from "@/lib/gallery.functions";

type Photo = {
  id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
};

async function fetchPhotos(): Promise<Photo[]> {
  const { data, error } = await supabase
    .from("gallery_photos")
    .select("id, image_url, caption, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export function GalleryManager() {
  const qc = useQueryClient();
  const upload = useServerFn(uploadGalleryPhoto);
  const update = useServerFn(updateGalleryPhoto);
  const reorder = useServerFn(reorderGalleryPhoto);
  const del = useServerFn(deleteGalleryPhoto);

  const { data: photos = [], isLoading } = useQuery({ queryKey: ["admin-gallery"], queryFn: fetchPhotos });

  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-gallery"] });
    qc.invalidateQueries({ queryKey: ["public-gallery"] });
  };

  const uploadMut = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Choisissez une image");
      const fd = new FormData();
      fd.append("file", file);
      fd.append("caption", caption);
      return upload({ data: fd });
    },
    onSuccess: () => {
      setFile(null);
      setCaption("");
      setUploadError(null);
      invalidate();
    },
    onError: (e: Error) => setUploadError(e.message),
  });

  const updateMut = useMutation({
    mutationFn: (v: { id: string; caption: string }) => update({ data: v }),
    onSuccess: invalidate,
  });
  const reorderMut = useMutation({
    mutationFn: (v: { id: string; direction: "up" | "down" }) => reorder({ data: v }),
    onSuccess: invalidate,
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: invalidate,
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    uploadMut.mutate();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="shell-card p-6">
        <h2 className="font-serif text-lg text-forest-deep">Ajouter une photo</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_2fr_auto]">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-forest/20 bg-white px-4 py-6 text-sm text-muted-foreground hover:border-terracotta">
            <Upload className="h-4 w-4" />
            {file ? file.name : "Choisir une image"}
            <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
          <input
            type="text"
            placeholder="Légende (optionnelle)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded-2xl border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus:border-terracotta"
          />
          <button type="submit" disabled={!file || uploadMut.isPending} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
            {uploadMut.isPending ? "Envoi…" : "Ajouter"}
          </button>
        </div>
        {uploadError && <p className="mt-3 text-sm text-destructive">{uploadError}</p>}
      </form>

      <section>
        <h2 className="mb-4 font-serif text-lg text-forest-deep">Photos ({photos.length})</h2>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : photos.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune photo pour l'instant. Ajoutez-en une ci-dessus.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p, idx) => (
              <PhotoCard
                key={p.id}
                photo={p}
                isFirst={idx === 0}
                isLast={idx === photos.length - 1}
                onSaveCaption={(cap) => updateMut.mutate({ id: p.id, caption: cap })}
                onMove={(dir) => reorderMut.mutate({ id: p.id, direction: dir })}
                onDelete={() => {
                  if (confirm("Supprimer cette photo ?")) deleteMut.mutate(p.id);
                }}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function PhotoCard({
  photo,
  isFirst,
  isLast,
  onSaveCaption,
  onMove,
  onDelete,
}: {
  photo: Photo;
  isFirst: boolean;
  isLast: boolean;
  onSaveCaption: (caption: string) => void;
  onMove: (dir: "up" | "down") => void;
  onDelete: () => void;
}) {
  const [caption, setCaption] = useState(photo.caption ?? "");
  const dirty = caption !== (photo.caption ?? "");

  return (
    <li className="shell-card overflow-hidden p-0">
      <div className="aspect-video overflow-hidden bg-cream-deep">
        <img src={photo.image_url} alt={photo.caption ?? ""} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Légende"
          rows={2}
          className="w-full resize-none rounded-xl border border-forest/15 bg-white px-3 py-2 text-sm outline-none focus:border-terracotta"
        />
        <div className="mt-3 flex items-center gap-1.5">
          <button
            onClick={() => onMove("up")}
            disabled={isFirst}
            className="rounded-full border border-forest/15 p-1.5 text-forest-deep hover:bg-cream-deep disabled:opacity-30"
            aria-label="Monter"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onMove("down")}
            disabled={isLast}
            className="rounded-full border border-forest/15 p-1.5 text-forest-deep hover:bg-cream-deep disabled:opacity-30"
            aria-label="Descendre"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onSaveCaption(caption)}
            disabled={!dirty}
            className="ml-auto inline-flex items-center gap-1 rounded-full bg-forest px-3 py-1.5 text-xs text-cream hover:bg-forest-deep disabled:opacity-40"
          >
            <Save className="h-3 w-3" /> Enregistrer
          </button>
          <button
            onClick={onDelete}
            className="rounded-full bg-destructive/10 p-1.5 text-destructive hover:bg-destructive hover:text-cream"
            aria-label="Supprimer"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </li>
  );
}
