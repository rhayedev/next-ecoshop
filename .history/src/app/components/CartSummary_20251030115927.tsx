'use client';
import { useCart } from '../stores/Cart';

export default function CartSummary() {
  const items = useCart(s => s.items);
  const total = useCart(s => s.total());
  const remove = useCart(s => s.remove);

  return (
    <aside>
      <h2>Panier</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} × {item.qty} — {item.price * item.qty} €
            <button onClick={() => remove(item.id)} style={{ marginLeft: 8 }}>
              Retirer
            </button>
          </li>
        ))}
      </ul>
      <p>Total : {total} €</p>
    </aside>
  );
}