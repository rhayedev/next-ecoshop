# Module 4 — Rendu côté serveur, génération statique et fetching des données
*(Next.js 15 – App Router)*

## 1. Objectifs pédagogiques
À l’issue de ce module, l’étudiant devra être en mesure de :
- Identifier et distinguer les principales stratégies de rendu proposées par Next.js (SSR, SSG, ISR).
- Comprendre les implications techniques et organisationnelles de chaque approche.
- Mettre en œuvre un chargement de données côté serveur au sein d’un projet Next.js 15 (App Router).
- Expliquer les principes de cache, revalidation et gestion d’erreurs serveur.
- Choisir la stratégie de rendu la plus adaptée à un besoin donné (site vitrine, application dynamique, plateforme e‑commerce, etc.).

## 2. Contexte et enjeux
Depuis l’introduction de l’**App Router**, la logique de rendu et de récupération de données est **serveur‑centrée** : composants serveur asynchrones, `fetch()` intégré avec cache, revalidation par durée (`export const revalidate = n`) ou par tag, et séparation nette Server/Client Components.
Le Pages Router et ses API `getStaticProps`/`getServerSideProps` ne sont plus la voie recommandée pour de nouveaux projets.

## 3. Déroulement du module
| Séquence | Contenu | Format | Durée |
|---|---|---|---|
| 1 | Théorie SSR/SSG/ISR & App Router | Exposé | 30 min |
| 2 | Démonstrations ciblées | Démo | 45 min |
| 3 | Exercices (SSR, SSG, ISR, erreurs) | TD | 60 min |
| 4 | Étude de cas « erreurs & revalidation » | Discussion | 30 min |
| 5 | Synthèse & évaluation | Q/R / mini‑QCM | 15 min |

## 4. Notions clés
- **SSR** : HTML généré à la requête (latence + exactitude).
- **SSG** : HTML pré‑généré au build (performance + stabilité).
- **ISR** : HTML pré‑généré + régénération périodique/à la demande.
- **Fetching serveur** : `fetch()` asynchrone dans composants serveur/route handlers.
- **Cache & revalidation** : `cache: 'force-cache' | 'no-store'`, `revalidate: n`, revalidation par tag.
- **Erreurs** : `error.tsx`, `not-found.tsx`, gestion `try/catch` côté serveur.

## 5. Points de vigilance
- Ne pas mélanger anciennes API de données du Pages Router avec l’App Router.
- Par défaut, `fetch()` met en cache en mode serveur : choisir explicitement `cache`/`revalidate` selon le besoin.
- Un composant client ne doit pas appeler directement des sources de données serveur : utiliser un composant serveur, une Server Action, ou un Route Handler.
- Prévoir la gestion des états d’erreur et des timeouts.

## 6. Livrables
- Un repo Next.js contenant 3 pages : une SSR, une SSG avec `generateStaticParams`, une ISR avec `revalidate`.
- Un court mémo (≈1 page) justifiant les choix de stratégie et leurs impacts (performance/SEO).
- Déploiement fonctionnel conseillé.

## 7. Références
- Next.js – Rendering Fundamentals / Data Fetching / Error Handling (docs officielles).