import { Products } from './products';

export async function fetchCategories() {
  const allProducts = Products.list();
  const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)));
  return uniqueCategories.map((name, idx) => ({
    id: String(idx + 1),
    name
  }));
}