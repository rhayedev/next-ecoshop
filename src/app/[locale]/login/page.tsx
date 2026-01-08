'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.push('/fr/products');
  };

  return (
    <main>
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" />

        <label htmlFor="password">Mot de passe</label>
        <input id="password" type="password" />

        <button type="submit">Se connecter</button>
      </form>
    </main>
  );
}
