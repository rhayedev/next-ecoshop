import { calcTotal, type CartItem } from '../../src/calc';

describe('calcTotal', () => {
  it('calcule le total avec arrondi à 2 décimales', () => {
    const items: CartItem[] = [
      { price: 19.9, qty: 2 },   // 39.8
      { price: 5.05, qty: 1 },   // 5.05
    ];
    const total = calcTotal(items);
    expect(total).toBe(44.85);   // 39.8 + 5.05 = 44.85
  });

  it('retourne 0 si le panier est vide', () => {
    expect(calcTotal([])).toBe(0);
  });

  it('calcule correctement avec plusieurs quantités', () => {
    const items: CartItem[] = [
      { price: 2.5, qty: 4 },    // 10
      { price: 3.33, qty: 3 },   // 9.99
    ];
    const total = calcTotal(items);
    expect(total).toBe(19.99);
  });
});
