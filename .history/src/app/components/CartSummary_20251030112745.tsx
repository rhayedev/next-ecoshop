'use client';
import { useCart } from '../stores/cart';

export default function CartSummary() {
  const items = useCart(s => s.items);
  const total = useCart(s => s.total());

  return (
    <aside>
      <h2>Panier</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} × {item.qty} — {item.price * item.qty} €
          </li>
        ))}
      </ul>
      <p>Total : {total} €</p>
    </aside>
  );
}