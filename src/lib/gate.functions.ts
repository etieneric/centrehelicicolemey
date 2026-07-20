import { createServerFn } from "@tanstack/react-start";

// Fonction pour vérifier si la session est déverrouillée côté client/serveur
export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { useSession } = await import("@tanstack/react-start/server");
  
  // Configuration d'une session basique sans dépendance à un secret de chiffrement lourd
  const session = await useSession<{ unlocked?: boolean }>({
    password: process.env.SITE_PASSWORD || "un_mot_de_passe_de_secours_tres_long_32_caracteres",
  });

  return { unlocked: !!session.data.unlocked };
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
    
    const expected = process.env.SITE_PASSWORD;
    if (!expected) {
      throw new Error("SITE_PASSWORD non configuré dans les variables Cloudflare");
    }

    // Comparaison simple du mot de passe
    if (data.password !== expected) {
      return { ok: false as const };
    }

    // On active la session
    const session = await useSession<{ unlocked?: boolean }>({
      password: expected,
    });
    
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

// Fonction pour se déconnecter
export const lockAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { useSession } = await import("@tanstack/react-start/server");
  
  const session = await useSession<{ unlocked?: boolean }>({
    password: process.env.SITE_PASSWORD || "un_mot_de_passe_de_secours_tres_long_32_caracteres",
  });
  
  await session.clear();
  return { ok: true as const };
});
