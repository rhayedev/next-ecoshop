export type CartItem = {
  price: number;
  qty: number;
};

export function calcTotal(items: CartItem[]): number {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return Math.round(total * 100) / 100;
}
