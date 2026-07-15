# Plan — Espace admin galerie & événements

## Vue d'ensemble

Ajout d'une page `/admin` protégée par un mot de passe partagé, permettant à Daniel de gérer les **photos de la galerie** et les **événements** (formations, séminaires, visites). Le site public affiche automatiquement les nouvelles photos dans la galerie existante et une nouvelle section « Événements à venir » sur la page d'accueil.

## Stockage (Lovable Cloud)

Activation de **Lovable Cloud** pour :
- **Base de données** : tables `gallery_photos` et `events`
- **Stockage fichiers** : bucket public `gallery` pour les photos uploadées et les images de couverture d'événements

Tables :
- `gallery_photos` — id, image_url, caption, sort_order, created_at
- `events` — id, title, description, event_date, location, event_type (formation/séminaire/visite/autre), cover_image_url, contact_link, created_at

Politiques : lecture publique (anonyme), écriture uniquement via server functions (service role, protégées par le mot de passe admin).

## Authentification admin

Mot de passe partagé unique, stocké côté serveur (`SITE_PASSWORD`), jamais dans le bundle client. Une session chiffrée (`SESSION_SECRET`) mémorise l'état "déverrouillé" pendant 7 jours. Comparaison en temps constant côté serveur.

Pages :
- `/admin/login` — formulaire mot de passe
- `/admin` — tableau de bord avec deux onglets : Galerie / Événements

## Interface admin

**Galerie** :
- Upload d'une nouvelle photo (drag & drop ou fichier)
- Champ légende
- Liste des photos existantes avec aperçu, édition légende, réordonnancement (flèches ↑↓) et suppression

**Événements** :
- Formulaire de création : titre, description, date, lieu, type, image de couverture (upload), lien contact/inscription
- Liste des événements avec édition et suppression
- Tri par date

## Affichage public

**Galerie** (composant existant `Gallery`) : lit désormais depuis `gallery_photos`. Si vide, garde les photos actuelles par défaut.

**Nouvelle section « Événements à venir »** sur la page d'accueil, entre `Videos` et `Gallery`. Cartes avec image de couverture, badge type, date, lieu, description et bouton « S'inscrire / Contact ». N'affiche que les événements à venir (date ≥ aujourd'hui), triés par date.

Nouvelle entrée « Événements » dans la navigation pointant vers `#evenements`.

## Détails techniques

- **Server functions** (`src/lib/admin.functions.ts`, `src/lib/gallery.functions.ts`, `src/lib/events.functions.ts`) :
  - Lecture publique via client publishable (`listPhotos`, `listUpcomingEvents`)
  - Écritures gated : chaque server function admin appelle `requireAdminUnlocked()` avant d'utiliser `supabaseAdmin`
  - Upload via Storage API (bucket `gallery`)
- **Gate** : `src/lib/gate.functions.ts` avec `useSession`, comparaison timing-safe (`sha256` + `timingSafeEqual`)
- **Secrets** : `SITE_PASSWORD` (fourni par l'utilisateur via formulaire sécurisé) et `SESSION_SECRET` (généré automatiquement, 64 chars)
- **Routes TanStack** : `src/routes/admin.tsx` (layout + gate côté serveur qui redirige vers `/admin/login` si non déverrouillé), `src/routes/admin.login.tsx`, `src/routes/admin.index.tsx`
- Composant `Events` public dans `src/routes/index.tsx`

## Livrables

Fichiers créés :
- Migration DB (tables + policies + bucket)
- `src/lib/gate.functions.ts`, `src/lib/gallery.functions.ts`, `src/lib/events.functions.ts`
- `src/routes/admin.tsx`, `src/routes/admin.login.tsx`, `src/routes/admin.index.tsx`
- `src/components/admin/GalleryManager.tsx`, `src/components/admin/EventsManager.tsx`
- `src/components/public/Events.tsx`

Fichiers modifiés :
- `src/routes/index.tsx` — galerie dynamique + section événements + lien nav
- Secrets : `SITE_PASSWORD`, `SESSION_SECRET`

## Ce qui vient après approbation

1. Activation Lovable Cloud + création tables + bucket
2. Création des secrets (formulaire pour `SITE_PASSWORD`)
3. Implémentation server functions + pages admin
4. Intégration affichage public
