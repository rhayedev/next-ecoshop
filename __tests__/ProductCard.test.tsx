import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../src/app/components/ProductCard';

describe('ProductCard', () => {
  it('affiche nom et prix', () => {
    render(<ProductCard name="Test" price={10} onAdd={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('10.00 €')).toBeInTheDocument();
  });

  it('bouton déclenche onAdd', () => {
    const handleAdd = jest.fn();
    render(<ProductCard name="Test" price={10} onAdd={handleAdd} />);
    fireEvent.click(screen.getByRole('button', { name: /ajouter test au panier/i }));
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });
});
