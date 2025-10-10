"use client";
export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div>
            <h2>Erreur serveur</h2>
            <pre>{error.message}</pre>
            <button
                className="hover:bg-gray-200 rounded py-2 px-4"
                onClick={reset}
            >
                Réessayer
            </button>
        </div>
    );
}
