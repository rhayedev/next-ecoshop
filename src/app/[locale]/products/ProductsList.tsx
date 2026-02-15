"use client";
import { useQuery } from "@tanstack/react-query";

import max from "lodash/max";

async function fetchProducts(page: number, q: string | null) {
  const res = await fetch(
    `/api/products?page=${page}${q ? `&q=${encodeURIComponent(q)}` : ""}`
  );
  if (!res.ok) throw new Error("Erreur de chargement");
  return res.json();
}

export default function ProductsList({
  page,
  q,
}: {
  page: number;
  q: string | null;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, q],
    queryFn: () => fetchProducts(page, q),
    staleTime: 30_000,
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement</p>;

  const prices = data.items.map((p: any) => p.price);
  const maxPrice = max(prices);

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {data.items.map((p: any) => (
        <li key={p.id} className="border rounded p-2">
          <p>{p.name}</p>
          <p>{p.price} €</p>
        </li>
      ))}
    </ul>
  );
}
