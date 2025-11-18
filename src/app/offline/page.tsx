export default function OfflinePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Mode hors ligne
      </h1>

      <p style={{ maxWidth: '30ch', marginBottom: '2rem', color: '#555' }}>
        Vous n’êtes pas connecté. Certaines fonctionnalités ne sont pas disponibles.
        Réessayez lorsque la connexion sera rétablie.
      </p>

      <a
        href="/"
        style={{
          color: '#3077C0',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        ↩️ Retour à l’accueil
      </a>
    </main>
  );
}
