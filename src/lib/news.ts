export type NewsItem = {
  id: string;
  title: string;
  date: string; // ISO string: "2025-10-09T15:30:00Z"
  excerpt: string;
  content?: string; // optionnel
};

async function load(id?: string): Promise<NewsItem[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) throw new Error('NEXT_PUBLIC_BASE_URL manquante (.env.local)');

  const tags = id ? ['news', `news:${id}`] : ['news'];

  const res = await fetch(`${base}/news.json`, {
    // Pas de revalidate ici : on pilote l’ISR au niveau de la page.
    next: { tags },
  });

  if (!res.ok) throw new Error('Impossible de charger les news');
  return res.json();
}

export const News = {
  async list(id?: string): Promise<NewsItem[]> {
    return load(id);
  },
  async get(id: string): Promise<NewsItem | null> {
    const all = await load();
    const item = all.find((n) => String(n.id) === String(id)) ?? null;
    return item;
  },
};
