import Link from "next/link";
import { Blogs } from "@/lib/blog";

export const metadata = {
    title: "Next Shop — Blogs",
    description: "Liste des Blogs",
};

export default function ProductsPage() {
    const blogs = Blogs.list();
    return (
        <ul className="flex-wrap flex gap-5">
            {blogs.map((b) => (
                <li key={b.id}>
                    <Link href={`/blogs/${b.id}`}></Link>
                </li>
            ))}
            <p>daaaaaaaaaaaa</p>
        </ul>
    );
}
