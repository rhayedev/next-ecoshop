'use client';
export default function GlobalError({ error }: { error: Error }) {
  return (
    <div>
      <h1>Une erreur est survenue</h1>
      <pre>{error.message}</pre>
    </div>
  );
}
