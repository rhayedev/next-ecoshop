import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  onAdd: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, price, onAdd }) => {
  return (
    <div className="product-card" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
      <h2>{name}</h2>
      <p>{price.toFixed(2)} €</p>
      <button 
        onClick={onAdd} 
        aria-label={`Ajouter ${name} au panier`}
        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Ajouter
      </button>
    </div>
  );
};
