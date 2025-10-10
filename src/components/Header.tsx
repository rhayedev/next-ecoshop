'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Header() {
	const t = useTranslations('nav');

	return (
		<header className="bg-gray-100 shadow-md">
			<div className="max-w-6xl mx-auto flex items-center justify-between p-4">
				<div className="text-2xl font-bold text-blue-600">Next Shop</div>
				<nav className="flex space-x-4">
					<Link href="/">{t('home')}</Link>
					<Link href="/products">{t('products')}</Link>
					<Link href="/about">{t('about')}</Link>
					<Link href="/blog">{t('blog')}</Link>
				</nav>
			</div>
		</header>
	);
}
