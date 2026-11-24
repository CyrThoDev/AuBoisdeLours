# auboisdelours.fr — page d'attente

Page d'attente de l'atelier de tournage sur bois **Au bois de l'ours** (Nicolas Kreutz), en attendant le nouveau site.

Next.js 16 (App Router) · Tailwind CSS v4 · TypeScript · polices auto-hébergées (Fontsource), sans appel à Google Fonts.

## À compléter avant la mise en ligne

En haut de `app/page.tsx` :

- `EMAIL` : adresse de contact
- `VILLE` : ville / département (pied de page)
- `TEL_AFFICHE` / `TEL_LIEN` : à valider avec Nicolas
- `PHOTO` : déposer l'image dans `public/` (ex. `public/piece-tournee.jpg`) puis mettre `"/piece-tournee.jpg"`

Couleurs et polices : `app/globals.css` (bloc `@theme`). Favicon : `app/icon.svg`.

## Développement

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
```

## Déploiement Vercel

1. Pousser le dossier sur un dépôt GitHub, puis l'importer dans Vercel (framework détecté automatiquement, aucun réglage à faire).
2. Une fois le transfert du domaine chez Hostinger confirmé : Vercel → projet → **Settings → Domains** → ajouter `auboisdelours.fr` et `www.auboisdelours.fr`.
3. Dans hPanel → **DNS / Serveurs de noms** de auboisdelours.fr : supprimer les A / CNAME par défaut, puis créer ceux affichés par Vercel (A pour le domaine nu, CNAME pour `www`).
4. Vercel valide le domaine et émet le certificat HTTPS automatiquement.
# AuBoisdeLours
