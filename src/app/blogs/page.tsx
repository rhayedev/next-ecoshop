import Link from "next/link";
import posts from "@/data/posts.json";

export const metadata = {
    title: "Next Shop — Blogs",
    description: "Liste des Blogs",
};

export default function BlogListPage() {
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-6">Liste des articles</h1>

            <ul className="flex flex-wrap gap-10">
                {posts.map((post) => (
                    <Link
                        href={`/blogs/${post.slug}`}
                        key={post.slug}
                        className="p-4 text-blue-600 text-xl ring-2 ring-blue-400 ring-offset-4 ring-offset-white bg-blue-100 w-60 flex-center h-20 rounded-3xl shadow-md trans-fast hover:bg-blue-50 hover:scale-105"
                    >
                        {post.title}
                    </Link>
                ))}
            </ul>
        </main>
    );
}
