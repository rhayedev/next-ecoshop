import { Products } from '@/lib/products';
import ProductsPageClient from './ProductsPageClient';

export const metadata = {
  title: 'Next Shop — Produits',
  description: 'Liste des produits',
};

export default async function ProductsPage() {
  return <ProductsPageClient />;
}
