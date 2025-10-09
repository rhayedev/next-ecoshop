'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
	const pathname = usePathname();
	const links = [
		{ href: '/', label: 'Accueil' },
		{ href: '/products', label: 'Produits' },
		{ href: '/about', label: 'À propos' },
		{ href: '/blog', label: 'Blog' },
	];

	const isActive = (href: string) =>
		pathname === href
			? 'text-white bg-blue-600 px-3 py-2 rounded-md'
			: 'text-gray-700 hover:text-white hover:bg-blue-500 px-3 py-2 rounded-md';

	return (
		<header className="bg-gray-100 shadow-md">
			<div className="max-w-6xl mx-auto flex items-center justify-between p-4">
				<div className="text-2xl font-bold text-blue-600">Next Shop</div>
				<nav className="flex space-x-4">
					{links.map((link) => (
						<Link key={link.href} href={link.href} className={isActive(link.href)}>
							{link.label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
