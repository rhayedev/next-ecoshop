"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Une erreur est survenue</h1>
      <pre>{error.message}</pre>
      <button
        onClick={() => reset()}
        style={{
          marginTop: "1.5rem",
          padding: "0.7rem 1.5rem",
          fontSize: "1.1rem",
          borderRadius: "0.5rem",
          background: "#4299e1",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Réessayer
      </button>
    </div>
  );
}