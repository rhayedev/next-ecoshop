import posts from "@/data/posts.json";

export async function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = posts.find((p) => p.slug === params.slug);

    if (!post) return <h1>Article introuvable</h1>;

    return (
        <article className="prose mx-auto py-10">
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
    );
}
