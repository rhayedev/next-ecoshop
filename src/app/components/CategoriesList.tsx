'use client';
import useSWR from 'swr';
import { fetchCategories } from '@/lib/categories';

export default function CategoriesList() {
  const { data: categories, isLoading, error } = useSWR('categories', fetchCategories);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement</p>;

  return (
    <ul>
      {categories?.map((cat) => (
        <li key={cat.id}>{cat.name}</li>
      ))}
    </ul>
  );
}