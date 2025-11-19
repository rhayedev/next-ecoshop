export type CartItem = {
  id: string;
  price: number; // price per unit
  qty?: number;
};

// Sum amounts and return total rounded to 2 decimals
export function calcTotal(items: CartItem[]) {
  const total = items.reduce((acc, it) => {
    const qty = typeof it.qty === 'number' ? it.qty : 1;
    return acc + it.price * qty;
  }, 0);
  return Math.round((total + Number.EPSILON) * 100) / 100;
}
