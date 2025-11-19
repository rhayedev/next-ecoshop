import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard, { Product } from '@/components/ProductCard';

describe('ProductCard', () => {
  const product: Product = { id: 'p1', name: 'Test product', price: 12.5 };

  test('renders title and formatted price', () => {
    render(<ProductCard product={product} onAdd={() => {}} />);
    expect(screen.getByText('Test product')).toBeInTheDocument();
    expect(screen.getByText(/12.50/)).toBeInTheDocument();
  });

  test('clicking add button calls callback', () => {
    const onAdd = jest.fn();
    render(<ProductCard product={product} onAdd={onAdd} />);
    const btn = screen.getByRole('button', { name: /Ajouter/ });
    fireEvent.click(btn);
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(product, 1);
  });
});
