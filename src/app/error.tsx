'use client';
import { useState } from 'react';

export default function GlobalError({ error }: { error: Error }) {
	const [retryKey, setRetryKey] = useState(0);

	const handleRetry = () => {
		setRetryKey((k) => k + 1);
	};

	return (
		<div className="max-w-lg mx-auto mt-24 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 text-center space-y-4">
			<h1 className="text-2xl font-bold text-red-600">Une erreur est survenue</h1>
			<p className="text-gray-700">{error.message}</p>
			<button
				key={retryKey}
				onClick={handleRetry}
				className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
			>
				Réessayer
			</button>
		</div>
	);
}
