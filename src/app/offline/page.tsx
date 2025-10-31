import Link from "next/link";

export default function OfflinePage() {
  return (
    <main>
      <h1>Mode hors ligne</h1>
      <p>Vous n’êtes pas connecté. Certaines fonctionnalités sont indisponibles.</p>
      <p>Réessayez lorsque la connexion sera rétablie.</p>
      <Link href="/">Retour à l’accueil</Link>
    </main>
  );
}