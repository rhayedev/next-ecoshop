'use client';
import { useCart } from '../../../stores/Cart';

type Props = {
  id: string;
  name: string;
  price: number;
  locale?: string;
};

export default function AddToCartButton({ id, name, price, locale }: Props) {
  const add = useCart(s => s.add);

  return (
    <button
      onClick={() => add({ id, name, price }, 1)}
      className="product-add"
      style={{ marginTop: 16 }}
    >
      {locale === 'fr' ? 'Ajouter au panier' : 'Add to cart'}
    </button>
  );
}