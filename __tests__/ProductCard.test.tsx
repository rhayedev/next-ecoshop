import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../src/app/components/ProductCard';

test('affiche le nom et le prix', () => {
  render(<ProductCard name="T-shirt" price={19.9} />);
  expect(screen.getByText('T-shirt')).toBeInTheDocument();
  expect(screen.getByText(/19\.90 €/)).toBeInTheDocument();
});

test('déclenche onAdd au clic', () => {
  const onAdd = jest.fn();
  render(<ProductCard name="T-shirt" price={19.9} onAdd={onAdd} />);
  fireEvent.click(screen.getByRole('button', { name: /Ajouter au panier/i }));
  expect(onAdd).toHaveBeenCalled();
});