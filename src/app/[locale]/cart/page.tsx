"use client";

import CartSummary from "@/components/CartSummary";

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Votre panier</h1>
      <CartSummary />
    </div>
  );
}