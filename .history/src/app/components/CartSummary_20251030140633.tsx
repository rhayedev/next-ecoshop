'use client';
import { useCart } from '../stores/Cart';
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/stores';

export default function CartSummary() {
  const items = useCart(s => s.items);
  const total = useCart(s => s.total());
  const remove = useCart(s => s.remove); // <-- AJOUT
  const currency = useSelector((state: RootState) => state.preferences.currency);

  function formatPrice(price: number) {
    if (currency === 'USD') {
      return `$${(price * 1.1).toFixed(2)}`;
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
            <button
              onClick={() => remove(item.id)}
              style={{ marginLeft: 8 }}
            >
              Retirer
            </button>
          </li>
        ))}
      </ul>
      <p>Total : {formatPrice(total)}</p>
    </aside>
  );
}