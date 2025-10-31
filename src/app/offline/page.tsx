export default function OfflinePage() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">Vous êtes hors ligne</h1>
        <p className="text-gray-700 text-center mb-6">
          Veuillez vérifier votre connexion internet.
        </p>
        <img src="/offline.png" alt="Hors ligne" className="w-64 h-64 object-contain" />
      </main>
    );
  }
  