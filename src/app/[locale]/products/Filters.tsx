'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Filters() {
  const router = useRouter();
  const params = useSearchParams();

  const q = params.get('q') ?? '';

  function updateParam(name: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(name, value);
    else next.delete(name);
    if (name === 'q') next.set('page', '1');
    router.push(`/products?${next.toString()}`);
  }

  return (
    <input
      className="border p-2 rounded w-full max-w-sm"
      type="search"
      placeholder="Recherche..."
      defaultValue={q}
      onChange={(e) => updateParam('q', e.target.value)}
    />
  );
}
