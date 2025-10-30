'use client';
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Erreur réseau');
    return res.json();
  });

export default function Categories() {
  const { data, error, isLoading } = useSWR('/api/categories', fetcher, {
    refreshInterval: 0, // pas de refetch automatique
  });

  if (isLoading) return <p>Chargement des catégories...</p>;
  if (error) return <p>Erreur lors du chargement</p>;

  return (
    <ul className="space-y-1 list-disc pl-4">
      {data.map((cat: any) => (
        <li key={cat.id}>{cat.name}</li>
      ))}
    </ul>
  );
}
