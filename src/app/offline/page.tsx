export default function OfflinePage() {
  return (
    <main className="offline-page">
      <h1 className="offline-title">Mode hors ligne</h1>

      <p className="offline-text">
        Vous n’êtes pas connecté. Certaines fonctionnalités ne sont pas disponibles.
        Réessayez lorsque la connexion sera rétablie.
      </p>

      <a href="/" className="offline-link">
        Retour à l’accueil
      </a>
    </main>
  );
}
