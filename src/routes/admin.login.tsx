import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { unlockAdmin } from "@/lib/gate.functions";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Espace admin — C.H.M" }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const unlock = useServerFn(unlockAdmin);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await unlock({ data: { password } });
      if (res.ok) {
        await navigate({ to: "/admin" });
      } else {
        setError("Mot de passe incorrect.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form onSubmit={onSubmit} className="shell-card w-full max-w-md p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10 text-forest">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl text-forest-deep">Espace administrateur</h1>
            <p className="text-xs text-muted-foreground">Gestion du contenu C.H.M</p>
          </div>
        </div>

        <label className="mt-8 block">
          <span className="text-sm font-medium text-forest-deep">Mot de passe</span>
          <input
            type="password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          />
        </label>

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

        <button type="submit" disabled={loading || !password} className="btn-primary mt-6 w-full justify-center inline-flex disabled:opacity-50">
          {loading ? "Vérification…" : "Se connecter"}
        </button>

        <a href="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-terracotta">← Retour au site</a>
      </form>
    </main>
  );
}
