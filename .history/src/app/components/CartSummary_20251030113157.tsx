'use client';
import { useCart } from '../stores/Cart';

export default function CartSummary() {
  const items = useCart(s => s.items);
  const total = useCart(s => s.total());
  const add = useCart(s => s.add);

  return (
    <aside>
      <h2>Panier</h2>
      <button
        onClick={() =>
          add({ id: '1', name: 'Produit test', price: 10 }, 1)
        }
      >
        Ajouter un produit test
      </button>
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