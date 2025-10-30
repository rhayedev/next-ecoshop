import Link from "next/link";
import posts from "@/data/posts.json";

export const metadata = {
    title: "Next Shop — Blogs",
    description: "Liste des Blogs",
};

export default async function BlogListPage() {
    return (
        <main className="mb-20">
            <ul className="flex flex-wrap gap-10">
                {posts.map((post) => (
                    <Link
                        href={`/blogs/${post.slug}`}
                        key={post.slug}
                        className="p-4 text-blue-600 pl-8 text-xl bg-blue-100 w-60 flex items-center h-20 rounded-3xl shadow-md trans-fast hover:bg-blue-200 hover:scale-105"
                    >
                        {post.title}
                    </Link>
                ))}
            </ul>
        </main>
    );
}
