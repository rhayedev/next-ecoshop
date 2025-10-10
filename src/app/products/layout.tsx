export default function ProductsLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="max-w-7xl mx-auto px-8 py-12">
			<h2 className="text-4xl font-extrabold text-blue-700 mb-10 text-center">
				Nos Produits
			</h2>
			{children}
		</section>
	);
}
