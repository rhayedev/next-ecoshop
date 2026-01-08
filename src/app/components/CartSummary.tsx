'use client';

import { useCart } from './CartContext';

export default function CartSummary() {
  const { total } = useCart();

  if (total === 0) return null;

  return (
    <section aria-label="Résumé du panier">
      <h2>Total panier</h2>
      <p>{total.toFixed(2)} €</p>
    </section>
  );
}
