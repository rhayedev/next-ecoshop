import posts from "@/data/posts.json";

type BlogPost = {
  slug: string;
  title: string;
  html: string;
  excerpt?: string;
};

type Props = { params: { slug: string; locale: string } };

// Génère les chemins statiques à build-time
export async function generateStaticParams() {
  return (posts as BlogPost[]).map((p) => ({ slug: p.slug }));
}

// Bonus : meta dynamique
export async function generateMetadata({ params }: Props) {
  const post = (posts as BlogPost[]).find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || "",
  };
}

export default function BlogPost({ params }: Props) {
  const post = (posts as BlogPost[]).find((p) => p.slug === params.slug);
  if (!post) throw new Error("Article introuvable");

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}