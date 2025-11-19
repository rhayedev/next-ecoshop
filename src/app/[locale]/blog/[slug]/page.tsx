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
export async function generateMetadata(props: Props) {
  const { params } = await props;
  const post = (posts as BlogPost[]).find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || "",
  };
}

export default async function BlogPost(props: Props) {
  const { params } = await props;
  const post = (posts as BlogPost[]).find((p) => p.slug === params.slug);
  if (!post) throw new Error("Article introuvable");

  return (
    <article className="blog-article">
      <h1 className="blog-title">{post.title}</h1>
      {post.excerpt && <div className="blog-excerpt">{post.excerpt}</div>}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}