"use client";

import { useCart } from "@/store/useCart";
import { Product } from "../common/types"



export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <button
      onClick={() => addItem({ ...product, quantity: 1 })}
      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
    >
      Ajouter au panier
    </button>
  );
}
