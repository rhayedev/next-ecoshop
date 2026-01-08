import { act } from '@testing-library/react';
import { useCart } from '../../src/app/stores/cart';

describe('useCart store', () => {
  beforeEach(() => {
    act(() => useCart.getState().clear());
  });

  it('ajoute un article', () => {
    act(() => useCart.getState().add({ id: '1', name: 'Test', price: 10, qty: 1 }));
    expect(useCart.getState().items.length).toBe(1);
  });

  it('supprime un article', () => {
    act(() => {
      useCart.getState().add({ id: '1', name: 'Test', price: 10, qty: 1 });
      useCart.getState().remove('1');
    });
    expect(useCart.getState().items.length).toBe(0);
  });

  it('total correct', () => {
    act(() => {
      useCart.getState().add({ id: '1', name: 'A', price: 5, qty: 2 });
      useCart.getState().add({ id: '2', name: 'B', price: 3, qty: 1 });
    });
    expect(useCart.getState().total()).toBe(13);
  });
});
