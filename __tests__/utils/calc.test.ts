import { calcTotal } from '@/lib/calc';

describe('calcTotal', () => {
  test('sums simple prices', () => {
    const items = [{ id: 'a', price: 10 }, { id: 'b', price: 5 }];
    expect(calcTotal(items)).toBe(15);
  });

  test('handles quantities', () => {
    const items = [{ id: 'a', price: 3.5, qty: 2 }, { id: 'b', price: 1.25, qty: 3 }];
    // 3.5*2 + 1.25*3 = 7 + 3.75 = 10.75
    expect(calcTotal(items)).toBe(10.75);
  });

  test('rounds correctly', () => {
    const items = [{ id: 'a', price: 0.1 }, { id: 'b', price: 0.2 }];
    // 0.1 + 0.2 = 0.30000000000000004 -> round to 0.3
    expect(calcTotal(items)).toBe(0.3);
  });
});
