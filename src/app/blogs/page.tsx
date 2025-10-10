import Link from "next/link";
import posts from "@/data/posts.json";

export const metadata = {
    title: "Next Shop — Blogs",
    description: "Liste des Blogs",
};

export default function BlogListPage() {
    return (
        <main className="mb-20">
            <h1 className="text-2xl font-bold mb-6">Liste des articles</h1>

            <ul className="flex flex-wrap gap-10">
                {posts.map((post) => (
                    <Link
                        href={`/blogs/${post.slug}`}
                        key={post.slug}
                        className="p-4 border-l-2 border-l-blue-500 text-blue-600 text-xl bg-blue-100 w-60 flex items-center h-20 rounded-e-3xl shadow-md trans-fast hover:bg-blue-50 hover:scale-105"
                    >
                        {post.title}
                    </Link>
                ))}
            </ul>
        </main>
    );
}
