"use client";

import { useCart } from "@/store/useCart";

export default function CartSummary() {
  const { items, total, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return <p>Votre panier est vide.</p>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Résumé du panier</h2>

      <ul className="mb-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between mb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{item.price * item.quantity} €</span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:underline ml-2"
            >Supprimer
            </button>
          </li>
        ))}
      </ul>

      <p className="font-semibold">
        Total : {total} €
      </p>

      <button
        onClick={clearCart}
        className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      > Vider le panier
      </button>
    </div>
  );
}
