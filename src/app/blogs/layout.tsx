export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <h2 className="text-5xl mb-20 mt-20">Blog</h2>
            {children}
        </section>
    );
}
