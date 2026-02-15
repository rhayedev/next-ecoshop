'use client';
import { useCart } from '../stores/cart';

export default function CartSummary() {
  const { items, total, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-4 border rounded-xl bg-gray-50">
        <p>Votre panier est vide.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-3">🛒 Panier</h2>
      <ul className="space-y-2 mb-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-1"
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span>{(item.price * item.qty).toFixed(2)} €</span>
            <button
              className="text-red-500 text-sm"
              onClick={() => remove(item.id)}
            >
              Retirer
            </button>
          </li>
        ))}
      </ul>
      <p className="font-semibold mb-3">
        Total : {total().toFixed(2)} €
      </p>
      <button
        onClick={clear}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Vider le panier
      </button>
    </div>
  );
}
