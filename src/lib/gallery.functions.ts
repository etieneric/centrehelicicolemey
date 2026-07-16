import { createServerFn } from "@tanstack/react-start";

const SIGNED_URL_EXPIRY = 60 * 60 * 24 * 365 * 20; // ~20 ans

async function signedUrlFor(path: string): Promise<string> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.storage
    .from("gallery")
    .createSignedUrl(path, SIGNED_URL_EXPIRY);
  if (error || !data) throw new Error(error?.message ?? "URL signée impossible");
  return data.signedUrl;
}

export const uploadGalleryPhoto = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("FormData attendu");
    const file = data.get("file");
    const caption = data.get("caption");
    if (!(file instanceof File)) throw new Error("Fichier requis");
    if (file.size === 0) throw new Error("Fichier vide");
    if (file.size > 15 * 1024 * 1024) throw new Error("Fichier trop volumineux (max 15 Mo)");
    if (!file.type.startsWith("image/")) throw new Error("Format d'image requis");
    return {
      file,
      caption: typeof caption === "string" ? caption.slice(0, 300) : "",
    };
  })
  .handler(async ({ data }) => {
    const { requireAdminUnlocked } = await import("./gate.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const ext = data.file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `photos/${crypto.randomUUID()}.${ext}`;
    const buffer = await data.file.arrayBuffer();

    const { error: upErr } = await supabaseAdmin.storage
      .from("gallery")
      .upload(path, buffer, { contentType: data.file.type, upsert: false });
    if (upErr) throw new Error(upErr.message);

    const imageUrl = await signedUrlFor(path);

    // Nouvelle photo en fin de liste
    const { data: maxRow } = await supabaseAdmin
      .from("gallery_photos")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const nextOrder = (maxRow?.sort_order ?? 0) + 1;

    const { error: insErr, data: inserted } = await supabaseAdmin
      .from("gallery_photos")
      .insert({ image_url: imageUrl, caption: data.caption || null, sort_order: nextOrder })
      .select()
      .single();
    if (insErr) throw new Error(insErr.message);
    return inserted;
  });

export const updateGalleryPhoto = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; caption: string }) => {
    if (typeof data?.id !== "string") throw new Error("ID requis");
    return { id: data.id, caption: (data.caption ?? "").slice(0, 300) };
  })
  .handler(async ({ data }) => {
    const { requireAdminUnlocked } = await import("./gate.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("gallery_photos")
      .update({ caption: data.caption || null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const reorderGalleryPhoto = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; direction: "up" | "down" }) => {
    if (typeof data?.id !== "string") throw new Error("ID requis");
    if (data.direction !== "up" && data.direction !== "down") throw new Error("Direction invalide");
    return data;
  })
  .handler(async ({ data }) => {
    const { requireAdminUnlocked } = await import("./gate.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: current } = await supabaseAdmin
      .from("gallery_photos")
      .select("id, sort_order")
      .eq("id", data.id)
      .maybeSingle();
    if (!current) throw new Error("Photo introuvable");

    const { data: neighbor } = await supabaseAdmin
      .from("gallery_photos")
      .select("id, sort_order")
      .order("sort_order", { ascending: data.direction === "up" ? false : true })
      .filter("sort_order", data.direction === "up" ? "lt" : "gt", current.sort_order)
      .limit(1)
      .maybeSingle();
    if (!neighbor) return { ok: true as const };

    // Échange les sort_order en deux étapes pour éviter la contrainte
    await supabaseAdmin.from("gallery_photos").update({ sort_order: -1 }).eq("id", current.id);
    await supabaseAdmin.from("gallery_photos").update({ sort_order: current.sort_order }).eq("id", neighbor.id);
    await supabaseAdmin.from("gallery_photos").update({ sort_order: neighbor.sort_order }).eq("id", current.id);
    return { ok: true as const };
  });

export const deleteGalleryPhoto = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => {
    if (typeof data?.id !== "string") throw new Error("ID requis");
    return data;
  })
  .handler(async ({ data }) => {
    const { requireAdminUnlocked } = await import("./gate.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Récupère l'URL pour tenter de supprimer le fichier
    const { data: row } = await supabaseAdmin
      .from("gallery_photos")
      .select("image_url")
      .eq("id", data.id)
      .maybeSingle();

    const { error } = await supabaseAdmin.from("gallery_photos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);

    if (row?.image_url) {
      // Extrait le chemin après "/gallery/"
      const match = row.image_url.match(/\/gallery\/([^?]+)/);
      if (match?.[1]) {
        await supabaseAdmin.storage.from("gallery").remove([decodeURIComponent(match[1])]).catch(() => undefined);
      }
    }
    return { ok: true as const };
  });
