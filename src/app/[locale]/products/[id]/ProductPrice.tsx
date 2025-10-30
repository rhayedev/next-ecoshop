'use client';
import { useSelector } from "react-redux";
import type { RootState } from "../../../stores/stores";

export default function ProductPrice({ price }: { price: number }) {
  const currency = useSelector((state: RootState) => state.preferences.currency);

  function formatPrice(price: number, currency: 'EUR' | 'USD') {
    if (currency === 'USD') {
      return `$${(price * 1.1).toFixed(2)}`;
    }
    return `${price.toFixed(2)} €`;
  }

  return <span>{formatPrice(price, currency)}</span>;
}