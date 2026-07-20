import { createServerFn } from "@tanstack/react-start";
import type { GateSession } from "./gate.server";

// Fonction pour vérifier si la session est déverrouillée côté client/serveur
export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { isAdminUnlocked } = await import("./gate.server");
  return { unlocked: await isAdminUnlocked() };
});

// Fonction pour valider le mot de passe
export const unlockAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => {
    if (!data || typeof data.password !== "string" || data.password.length === 0) {
      throw new Error("Mot de passe requis");
    }
    if (data.password.length > 200) throw new Error("Mot de passe invalide");
    return data;
  })
  .handler(async ({ data }) => {
    const { useSession } = await import("@tanstack/react-start/server");
    const { getSessionConfig, passwordMatches } = await import("./gate.server");
    
    const expected = process.env.SITE_PASSWORD || "Robert123!";
    
    // Comparaison sécurisée (timing-safe)
    if (!passwordMatches(data.password, expected)) {
      return { ok: false as const };
    }

    // On active la session sécurisée
    const session = await useSession<GateSession>(getSessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

// Fonction pour se déconnecter
export const lockAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { useSession } = await import("@tanstack/react-start/server");
  const { getSessionConfig } = await import("./gate.server");
  
  const session = await useSession<GateSession>(getSessionConfig());
  await session.clear();
  return { ok: true as const };
});
