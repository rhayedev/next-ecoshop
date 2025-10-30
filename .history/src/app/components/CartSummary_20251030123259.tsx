'use client';
import { useCart } from '../stores/Cart';
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/stores';

export default function CartSummary() {
  const items = useCart(s => s.items);
  const total = useCart(s => s.total());
  const currency = useSelector((state: RootState) => state.preferences.currency);

  // Fonction de formatage
  function formatPrice(price: number) {
    if (currency === 'USD') {
      return `$${(price * 1.1).toFixed(2)}`; // exemple: taux fictif EUR->USD
    }
    return `${price.toFixed(2)} €`;
  }

  return (
    <aside>
      <h2>Panier</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} × {item.qty} — {formatPrice(item.price * item.qty)}
          </li>
        ))}
      </ul>
      <p>Total : {formatPrice(total)}</p>
    </aside>
  );
}