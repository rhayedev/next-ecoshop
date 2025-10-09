import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

// Fonction pour générer les métadonnées dynamiquement
export async function generateMetadata({ params }: Props) {
  if (params.slug === "unknown") {
    notFound();
  }
  return {
    title: `Article : ${params.slug} — Next Shop`,
    description: `Découvrez l'article de blog "${params.slug}" sur Next Shop.`,
  };
}

export default function BlogPostPage({ params }: Props) {
  if (params.slug === "unknown") {
    notFound();
  }
  return (
    <main>
      <h1>Article de blog : {params.slug}</h1>
      <p>Ceci est un article dynamique avec le slug : <b>{params.slug}</b></p>
    </main>
  );
}