# Connecter l'authentification à Supabase — Guide pas à pas

Ce document explique comment brancher l'authentification de votre application (actuellement basée sur un mot de passe partagé stocké dans `SITE_PASSWORD`) sur **Supabase Auth**, afin de gérer de vrais comptes utilisateurs (email/mot de passe, Google, etc.).

> ℹ️ Ce projet tourne sur **Lovable Cloud** (qui utilise Supabase en coulisses). Vous n'avez donc **pas besoin de créer un compte Supabase séparé** : le projet, la base de données et l'authentification existent déjà.

---

## 1. Vérifier que Lovable Cloud est actif

1. Dans Lovable, ouvrez votre projet.
2. Menu de gauche → **Cloud** (ou **Backend**).
3. Vérifiez que le statut est **Activé**. Si ce n'est pas le cas, cliquez sur *Enable Cloud*.

Une fois activé, votre app dispose automatiquement de :
- une base de données Postgres,
- un service d'authentification,
- un stockage de fichiers,
- des secrets serveur (déjà présents : `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).

---

## 2. Choisir les méthodes de connexion

Dans Lovable Cloud → **Users** → **Auth settings** (icône ⚙️), activez :

- ✅ **Email + mot de passe** (par défaut recommandé)
- ✅ **Google** (sign-in social recommandé)
- Optionnel : **Apple**, **SAML SSO**, **Téléphone (SMS)**

> Pour un site pro comme le C.H.M, **Email + Google** couvre 95 % des besoins.

Pendant le développement, activez aussi **Auto-confirm email** pour éviter d'attendre les emails de confirmation. À désactiver avant la mise en production.

---

## 3. Décider si vous avez besoin de « profils »

Question clé **avant d'écrire une ligne de code** :

> Faut-il stocker des informations liées à chaque utilisateur (nom, avatar, rôle admin, préférences) ?

- **Non** → utilisez uniquement la table intégrée `auth.users`. Rien à créer.
- **Oui** → créez une table `profiles` liée à `auth.users` (voir §5).

Pour le C.H.M, si Daniel veut plusieurs administrateurs avec des rôles distincts, la réponse est **oui**.

---

## 4. Ajouter une page de connexion dans l'app

Créez une route publique `src/routes/auth.tsx` avec un formulaire email/mot de passe **et** un bouton Google.

Squelette :

```tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable"; // pour Google

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) navigate({ to: "/admin" });
  }

  async function signInGoogle() {
    await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
  }

  return (
    <form onSubmit={signIn}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      <button type="submit">Se connecter</button>
      <button type="button" onClick={signInGoogle}>Continuer avec Google</button>
    </form>
  );
}
```

Pour l'inscription, ajoutez un second formulaire appelant `supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })`.

---

## 5. Protéger les pages admin

Aujourd'hui `/admin` est protégée par le mot de passe partagé (`gate.server.ts`). Pour passer à Supabase Auth :

1. **Déplacez** les routes admin sous le layout `src/routes/_authenticated/` (fourni automatiquement par l'intégration Lovable + Supabase) :
   - `src/routes/_authenticated/admin.tsx`
   - `src/routes/_authenticated/admin.index.tsx`

   Ce layout redirige automatiquement vers `/auth` si l'utilisateur n'est pas connecté.

2. **Supprimez** l'ancienne logique de mot de passe :
   - `src/lib/gate.server.ts`
   - `src/lib/gate.functions.ts`
   - `src/routes/admin.login.tsx`
   - Les appels à `checkAdminSession` / `unlockAdmin` / `lockAdmin`.

3. **Remplacez** `requireAdminUnlocked()` dans les server functions par le middleware `requireSupabaseAuth` :

   ```ts
   import { createServerFn } from "@tanstack/react-start";
   import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

   export const createEvent = createServerFn({ method: "POST" })
     .middleware([requireSupabaseAuth])
     .inputValidator(/* ... */)
     .handler(async ({ data, context }) => {
       // context.userId = ID de l'utilisateur connecté
       // context.supabase = client Supabase authentifié
     });
   ```

---

## 6. Gérer les rôles (admin, modérateur…)

**Ne stockez jamais les rôles sur `profiles`** (risque d'escalade de privilèges). Créez une table dédiée via une migration SQL :

```sql
create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles
                 where user_id = _user_id and role = _role);
$$;
```

Puis dans vos server functions admin :

```ts
const { data: isAdmin } = await context.supabase
  .rpc("has_role", { _user_id: context.userId, _role: "admin" });
if (!isAdmin) throw new Error("Accès refusé");
```

Pour désigner Daniel admin, exécutez une fois (dans une migration ou depuis Cloud → SQL Editor) :

```sql
insert into public.user_roles (user_id, role)
values ('<UUID_DE_DANIEL>', 'admin');
```

---

## 7. Afficher l'état de connexion dans l'UI

Dans le header, remplacez le bouton statique par un menu qui réagit à la session :

```tsx
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const [user, setUser] = useState(null);
useEffect(() => {
  supabase.auth.getUser().then(({ data }) => setUser(data.user));
  const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
  return () => sub.subscription.unsubscribe();
}, []);
```

Bouton **Déconnexion** :

```ts
await supabase.auth.signOut();
navigate({ to: "/auth", replace: true });
```

---

## 8. Réinitialisation du mot de passe (optionnel mais recommandé)

1. **Formulaire « Mot de passe oublié »** :
   ```ts
   await supabase.auth.resetPasswordForEmail(email, {
     redirectTo: `${window.location.origin}/reset-password`,
   });
   ```

2. **Page `/reset-password`** (obligatoire, sinon l'utilisateur est simplement reconnecté sans réinitialiser) :
   ```ts
   await supabase.auth.updateUser({ password: newPassword });
   ```

---

## 9. Tester

1. Créer un compte via `/auth`.
2. Se déconnecter, se reconnecter.
3. Tenter d'accéder à `/admin` déconnecté → doit rediriger vers `/auth`.
4. Se connecter avec un compte **sans** rôle admin → les actions admin doivent renvoyer « Accès refusé ».
5. Ajouter le rôle `admin` à ce compte → les actions passent.

---

## 10. Mise en production

Avant de publier :

- Désactiver **Auto-confirm email** dans Cloud → Users → Auth settings.
- Activer **Password HIBP Check** (vérifie que le mot de passe n'est pas compromis).
- Vérifier que le provider Google est bien configuré (Cloud → Users → Providers).
- Republier l'app pour que les changements de secrets/routes soient déployés.

---

## Récapitulatif des fichiers touchés

| Créés | Modifiés | Supprimés |
|---|---|---|
| `src/routes/auth.tsx` | Routes admin déplacées sous `_authenticated/` | `src/lib/gate.server.ts` |
| `src/routes/reset-password.tsx` | Server functions admin (utilisent `requireSupabaseAuth`) | `src/lib/gate.functions.ts` |
| Migration SQL `user_roles` + `has_role` | Header (état connecté/déconnecté) | `src/routes/admin.login.tsx` |

---

**Besoin d'aide pour l'implémenter ?** Dites simplement : *« Migre l'admin vers Supabase Auth avec email + Google et rôle admin »*, et je fais tous les changements ci-dessus en une passe.
