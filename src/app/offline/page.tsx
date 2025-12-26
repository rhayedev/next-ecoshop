"use client";
import Link from "next/link";

export default function OfflinePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4 text-red-600">
                Vous êtes hors ligne
            </h1>
            <p className="mb-6 text-gray-700">
                Il semble que vous ayez perdu votre connexion Internet.
                <br />
                Pas d’inquiétude ! Vous pouvez réessayer plus tard ou revenir à l’accueil.
            </p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Retour à l’accueil
            </Link>
        </main>
    );
}
