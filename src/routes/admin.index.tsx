import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CalendarPlus, Images, LogOut } from "lucide-react";
import { EventsManager } from "@/components/admin/EventsManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { checkAdminSession, lockAdmin } from "@/lib/gate.functions";

export const Route = createFileRoute("/admin/")({
  beforeLoad: async () => {
    const { unlocked } = await checkAdminSession();
    if (!unlocked) throw redirect({ to: "/admin/login" });
  },
  component: AdminHome,
});

function AdminHome() {
  const [tab, setTab] = useState<"gallery" | "events">("gallery");
  const navigate = useNavigate();
  const lock = useServerFn(lockAdmin);

  async function handleLogout() {
    await lock();
    await navigate({ to: "/admin/login", replace: true });
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-forest/10 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="font-serif text-xl text-forest-deep">Espace administrateur</h1>
            <p className="text-xs text-muted-foreground">Centre Hélicicole Meye</p>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="text-xs text-muted-foreground hover:text-terracotta">← Voir le site</a>
            <button onClick={handleLogout} className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 px-3 py-1.5 text-xs text-forest-deep hover:bg-cream-deep">
              <LogOut className="h-3.5 w-3.5" /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex gap-2">
          <button onClick={() => setTab("gallery")} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${tab === "gallery" ? "bg-forest text-cream" : "bg-white text-forest-deep hover:bg-cream-deep"}`}>
            <Images className="h-4 w-4" /> Galerie
          </button>
          <button onClick={() => setTab("events")} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${tab === "events" ? "bg-forest text-cream" : "bg-white text-forest-deep hover:bg-cream-deep"}`}>
            <CalendarPlus className="h-4 w-4" /> Événements
          </button>
        </div>
        {tab === "gallery" ? <GalleryManager /> : <EventsManager />}
      </div>
    </main>
  );
}