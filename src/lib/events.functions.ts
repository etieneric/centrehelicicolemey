import { createServerFn } from "@tanstack/react-start";

const EVENT_TYPES = ["formation", "seminaire", "visite", "autre"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

const SIGNED_URL_EXPIRY = 60 * 60 * 24 * 365 * 20;

async function uploadCover(file: File): Promise<string> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `events/${crypto.randomUUID()}.${ext}`;
  const buffer = await file.arrayBuffer();
  const { error } = await supabaseAdmin.storage
    .from("gallery")
    .upload(path, buffer, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  const { data, error: sErr } = await supabaseAdmin.storage
    .from("gallery")
    .createSignedUrl(path, SIGNED_URL_EXPIRY);
  if (sErr || !data) throw new Error(sErr?.message ?? "URL signée impossible");
  return data.signedUrl;
}

function parseEventForm(data: unknown) {
  if (!(data instanceof FormData)) throw new Error("FormData attendu");
  const title = String(data.get("title") ?? "").trim().slice(0, 200);
  const description = String(data.get("description") ?? "").trim().slice(0, 4000);
  const event_date = String(data.get("event_date") ?? "").trim();
  const location = String(data.get("location") ?? "").trim().slice(0, 300);
  const rawType = String(data.get("event_type") ?? "formation");
  const event_type = (EVENT_TYPES as readonly string[]).includes(rawType) ? rawType : "formation";
  const contact_link = String(data.get("contact_link") ?? "").trim().slice(0, 500);
  const id = data.get("id");
  const file = data.get("cover");
  if (!title) throw new Error("Titre requis");
  if (!event_date || Number.isNaN(new Date(event_date).getTime())) throw new Error("Date invalide");
  if (file && !(file instanceof File)) throw new Error("Fichier invalide");
  if (file instanceof File && file.size > 15 * 1024 * 1024) throw new Error("Image trop volumineuse (max 15 Mo)");
  return {
    id: typeof id === "string" && id ? id : null,
    title,
    description: description || null,
    event_date: new Date(event_date).toISOString(),
    location: location || null,
    event_type,
    contact_link: contact_link || null,
    cover: file instanceof File && file.size > 0 ? file : null,
  };
}

export const saveEvent = createServerFn({ method: "POST" })
  .inputValidator(parseEventForm)
  .handler(async ({ data }) => {
    const { requireAdminUnlocked } = await import("./gate.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let cover_image_url: string | null = null;
    if (data.cover) cover_image_url = await uploadCover(data.cover);

    const payload = {
      title: data.title,
      description: data.description,
      event_date: data.event_date,
      location: data.location,
      event_type: data.event_type,
      contact_link: data.contact_link,
      ...(cover_image_url ? { cover_image_url } : {}),
    };

    if (data.id) {
      const { error } = await supabaseAdmin.from("events").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("events").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true as const };
  });

export const deleteEvent = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => {
    if (typeof data?.id !== "string") throw new Error("ID requis");
    return data;
  })
  .handler(async ({ data }) => {
    const { requireAdminUnlocked } = await import("./gate.server");
    await requireAdminUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("events").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
