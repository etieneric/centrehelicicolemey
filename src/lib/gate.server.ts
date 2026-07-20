// Server-only helpers for the admin password gate.
// Never import this from client code or from route/component files.
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

export type GateSession = { unlocked?: boolean };

export function getSessionConfig() {
  // Récupère votre mot de passe court (Robert123!)
  const basePassword = process.env.SITE_PASSWORD || "Robert123!";
  
  // ASTUCE : On hache le mot de passe court en SHA-256 pour générer 
  // une clé technique unique et fixe de 32 caractères requise par TanStack.
  const technicalSessionSecret = createHash("sha256").update(basePassword).digest("hex").substring(0, 32);

  return {
    password: technicalSessionSecret,
    name: "chm-admin",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

export function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function isAdminUnlocked(): Promise<boolean> {
  const session = await useSession<GateSession>(getSessionConfig());
  return !!session.data.unlocked;
}

export async function requireAdminUnlocked(): Promise<void> {
  if (!(await isAdminUnlocked())) {
    throw new Error("Non autorisé : session admin requise.");
  }
}
