import CartSummary from '../../components/CartSummary';

export default function CartPage() {
  return (
    <main className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Mon panier</h1>
      <CartSummary />
    </main>
  );
}
