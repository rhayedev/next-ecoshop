# Module 4 — Rendu côté serveur, génération statique et fetching des données
*(Next.js 15 – App Router — version détaillée)*

## 0. Prérequis rapides
- Node.js LTS (>= 18) et gestionnaire de paquets `pnpm` ou `npm`.
- Projet Next.js initialisé via `pnpm create next-app` (choisir **App Router**).
- Bonnes bases en React, `async/await`, `fetch`, et en compréhension du cycle de rendu.

---

## 1. Stratégies de rendu : définitions, enjeux, SEO et performances

### 1.1 Server-Side Rendering (SSR)

#### Définition
Le **Server-Side Rendering** (SSR) consiste à **générer le HTML côté serveur à chaque requête utilisateur**.  
Chaque fois qu’un visiteur accède à une page, Next.js exécute la fonction serveur (`page.tsx`), récupère les données via `fetch()`, et renvoie le HTML finalisé.

#### Avantages
- ✅ **Données toujours à jour** : parfait pour les contenus dynamiques (stock, météo, prix…).  
- ✅ **SEO optimal** : les moteurs de recherche reçoivent directement du HTML complet.  
- ✅ **Adapté à la personnalisation** (ex. utilisateur connecté, panier, tableau de bord).

#### Inconvénients
- ⚠️ **Coût serveur élevé** : chaque requête implique une exécution complète.  
- ⚠️ **Temps de réponse (TTFB)** plus long, surtout si les appels API sont lents.  
- ⚠️ **Scalabilité moindre** : il faut gérer la charge via cache ou CDN.

#### Exemple complet
```tsx
// app/products/[id]/page.tsx
type Params = { params: { id: string } };

export default async function ProductPage({ params }: Params) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
    cache: 'no-store', // pas de cache → SSR pur
  });

  if (!res.ok) throw new Error('API produits indisponible');

  const product = await res.json();

  return (
    <main>
      <h1>{product.title}</h1>
      <p>Prix : {product.price} €</p>
      <p>{product.description}</p>
    </main>
  );
}
```

#### Contextes où l’utiliser
- Dashboards internes ou outils d’administration.
- Applications e-commerce avec prix/stock en temps réel.
- Interfaces nécessitant authentification et personnalisation.  

#### Impacts SEO
- Excellent, car les robots reçoivent une page complète et fraîche.  
- À privilégier pour des pages dont le contenu évolue souvent.

#### Impacts performance
- Dépend fortement de la latence réseau.  
- À combiner avec un cache CDN (Cloudflare, Vercel Edge, etc.) pour les routes les plus visitées.

---

### 1.2 Static Site Generation (SSG)

#### Définition
Le **Static Site Generation** (SSG) pré-génère le HTML **au moment du build**.  
Chaque page est construite **une seule fois**, puis servie comme fichier statique depuis un CDN.

#### Avantages
- 🚀 **Performances maximales** : les pages sont servies directement depuis le CDN.  
- 💸 **Coût serveur minimal** : aucune exécution serveur par visite.  
- 🔒 **Haute stabilité** : zéro dépendance temps réel.

#### Inconvénients
- ❌ **Contenu figé** : nécessite un rebuild pour voir les mises à jour.  
- ❌ **Peu adapté aux données volatiles**.

#### Exemple complet
```tsx
// app/blog/[slug]/page.tsx
import posts from '@/data/posts.json';

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) throw new Error('Article introuvable');

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
```

#### Contextes où l’utiliser
- Blogs, documentations, landing pages.  
- Sites vitrines, portfolios, contenu peu modifié.  

#### Impacts SEO
- Excellent, car HTML livré instantanément.  
- Idéal pour pages marketing (vitesse = meilleur classement).

#### Impacts performance
- TTFB quasi nul (pages servies en cache CDN).  
- Aucun coût serveur récurrent.  

---

### 1.3 Incremental Static Regeneration (ISR)

#### Définition
L’**ISR** combine le meilleur du SSG et du SSR.  
Next.js génère une page statique **une première fois**, puis la régénère **automatiquement après un délai (revalidate)** ou **sur demande (revalidateTag)**.

#### Avantages
- 🔄 **Mises à jour automatiques** sans rebuild global.  
- ⚡ **Performance proche du SSG** après première génération.  
- 🧩 **Excellent équilibre entre fraîcheur et coût**.

#### Inconvénients
- ⚠️ Première visite plus lente (page générée).  
- ⚠️ Les données peuvent être légèrement obsolètes selon la période de revalidation.

#### Exemple complet avec tag et revalidation
```tsx
// app/news/[id]/page.tsx
import { notFound } from 'next/navigation';

export const revalidate = 60; // revalidation toutes les 60s

export default async function NewsPage({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.example.com/news/${params.id}`, {
    next: { tags: ['news', `news:${params.id}`] },
  });

  if (!res.ok) notFound();

  const article = await res.json();

  return (
    <article>
      <h1>{article.title}</h1>
      <p><small>Publié le {article.date}</small></p>
      <p>{article.excerpt}</p>
    </article>
  );
}
```

#### Exemple d’invalidation manuelle
```ts
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { tag } = await req.json();
  revalidateTag(tag);
  return NextResponse.json({ ok: true, revalidated: tag });
}
```

#### Contextes où l’utiliser
- Blogs et actualités régulièrement mises à jour.  
- E-commerces avec catalogue stable mais promotions fréquentes.  
- Sites à grand trafic nécessitant un bon équilibre entre fraîcheur et coût.

#### Impacts SEO
- HTML statique envoyé → très bon SEO.  
- Contenu toujours presque à jour → Googlebot adore.  

#### Impacts performance
- Temps de génération unique, puis servie depuis le CDN.  
- Idéal pour 10k+ pages sans rebuild total.  

---

## 2. Fetching côté serveur avec Next 15

### 2.1 Cache & Revalidate
| Stratégie | Option `fetch` | Mécanisme | Idéal pour |
|------------|----------------|------------|-------------|
| **SSR** | `{ cache: 'no-store' }` | Pas de cache, fetch à chaque requête | Données volatiles |
| **SSG** | `{ cache: 'force-cache' }` (par défaut) | Cache au build | Données stables |
| **ISR** | `export const revalidate = n` | Regénération auto toutes les `n` secondes | Données semi-statiques |

**Revalidation par tag**
```tsx
const res = await fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] },
});
```

```ts
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
export async function POST() {
  revalidateTag('posts');
  return Response.json({ revalidated: true });
}
```

---

### 2.2 Server vs Client Components
| Type | Exécution | Accès à fetch() | Usage typique |
|------|------------|----------------|----------------|
| **Server Component** | Côté serveur | ✅ Oui | Pages, layout, rendu SEO |
| **Client Component** | Côté navigateur | ⚠️ Non pour secrets | Interactivité, formulaires |

Bonnes pratiques :  
- Laisser les **Server Components** faire le data fetching.  
- Passer les données en **props** aux composants clients.  
- Utiliser **Server Actions** pour les mutations.

---

## 3. Gestion des erreurs côté serveur

### Fichiers spéciaux
- `app/error.tsx` → gère les exceptions (UI spécifique).  
- `app/not-found.tsx` → gère `notFound()` (404).

**Exemple :**
```tsx
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Erreur serveur</h2>
      <pre>{error.message}</pre>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
```

---

## 4. Exercices

### Exercice 1 — SSR « Produit »
- Page : `/products/[id]`
- Fetch : `cache: 'no-store'`
- Afficher : titre, prix, description.
- Gérer : cas `!res.ok` → lever erreur (afficher `error.tsx`).

### Exercice 2 — SSG « Blog »
- Pages : `/blog/[slug]`
- Implémenter : `generateStaticParams()` depuis une source locale (`/data/posts.json`).
- Afficher : titre, contenu HTML sécurisé.
- Bonus : meta dynamique (title/description) via `generateMetadata()`.

### Exercice 3 — ISR « News »
- Page : `/news/[id]`
- `export const revalidate = 30`
- Afficher : titre, date, extrait.
- Bonus : revalidation par **tag** et **route handler** POST `/api/revalidate`.

### Exercice 4 — Gestion d’erreurs
- Simuler : API indisponible (URL erronée).
- Afficher : UI `error.tsx` + bouton *Réessayer*.
- Bonus : Implémenter un timeout d’1,5 s avec `AbortController`.


---

## 5. Comparatif global

| Critère | SSR | SSG | ISR |
|----------|-----|-----|-----|
| **Rendu HTML** | À chaque requête | Au build | Statique + régénéré |
| **Temps de réponse** | Moyen | Excellent | Excellent après 1er rendu |
| **SEO** | Excellent | Excellent | Excellent |
| **Coût serveur** | Élevé | Faible | Très faible |
| **Données à jour** | Immédiatement | Fige au build | Régénérées périodiquement |
| **Exemples typiques** | Dashboard, API temps réel | Blog, doc | Site d’actu, e-commerce |

---

## 6. Auto-évaluation

- [ ] Je sais quand choisir SSR / SSG / ISR selon les besoins du projet.
- [ ] Je comprends comment `cache` et `revalidate` influencent la fraîcheur et les performances.
- [ ] Je peux implémenter `revalidateTag()` pour invalider le cache à la demande.
- [ ] Je sais expliquer les impacts SEO et performance de chaque stratégie.
