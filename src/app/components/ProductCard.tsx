type ProductCardProps = {
  name: string;
  price: number;
  onAdd?: () => void;
};

export default function ProductCard({ name, price, onAdd }: ProductCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{price.toFixed(2)} €</p>
      {onAdd && (
        <button onClick={onAdd}>Ajouter au panier</button>
      )}
    </div>
  );
}
