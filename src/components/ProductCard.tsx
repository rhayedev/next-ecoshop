import React from 'react';
import Image from 'next/image';

export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

type Props = {
  product: Product;
  currency?: 'EUR' | 'USD';
  onAdd: (product: Product, qty?: number) => void;
};

function formatPrice(price: number, currency: 'EUR' | 'USD' = 'EUR') {
  if (currency === 'USD') return `$${(price * 1.1).toFixed(2)}`;
  return `${price.toFixed(2)} €`;
}

export default function ProductCard({ product, currency = 'EUR', onAdd }: Props) {
  return (
    <article className="product-card">
      {product.image && (
        <Image
          src={product.image}
          alt={product.name}
          className="product-img"
          width={200}
          height={200}
        />
      )}
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <span className="product-price">{formatPrice(product.price, currency)}</span>
      </div>
      <button
        className="product-add"
        aria-label={`Ajouter ${product.name} au panier`}
        onClick={() => onAdd(product, 1)}
      >
        Ajouter au panier
      </button>
    </article>
  );
}
