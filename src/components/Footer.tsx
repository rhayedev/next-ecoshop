export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-300 py-8 mt-16">
			<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="text-center md:text-left">
					<h3 className="text-lg font-semibold text-white">Next Shop</h3>
					<p className="text-sm text-gray-400">Votre boutique tech de confiance.</p>
				</div>

				<nav className="flex space-x-6 text-sm">
					<a href="/about" className="hover:text-white transition-colors">
						À propos
					</a>
					<a href="/products" className="hover:text-white transition-colors">
						Produits
					</a>
					<a href="/blog" className="hover:text-white transition-colors">
						Blog
					</a>
				</nav>

				<small className="text-gray-500 text-xs">
					© {new Date().getFullYear()} Next Shop — Tous droits réservés.
				</small>
			</div>
		</footer>
	);
}
