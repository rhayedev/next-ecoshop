type Props = { params: { slug: string } };

// Fonction pour générer les métadonnées dynamiquement
export async function generateMetadata({ params }: Props) {
  return {
    title: `Article : ${params.slug} — Eco Shop`,
    description: `Découvrez l'article de blog "${params.slug}" sur Eco Shop.`,
  };
}

export default function BlogPostPage({ params }: Props) {
  return (
    <main>
      <h1>Article de blog : {params.slug}</h1>
      <p>Ceci est un article dynamique avec le slug : <b>{params.slug}</b></p>
    </main>
  );
}