import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const intl = createMiddleware({
	locales: ['fr', 'en'],
	defaultLocale: 'fr',
});

export default function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// 1) Laisser passer toutes les requêtes d'assets/techniques
	if (
		pathname.startsWith('/_next') || // assets Next à la racine
		pathname.includes('/_next/') || // couvre /fr/_next et /en/_next si ça arrive
		pathname.startsWith('/api') ||
		pathname.startsWith('/.well-known') ||
		/\.[a-z0-9]+$/i.test(pathname) // fichiers avec extension (.js, .css, .png, ...)
	) {
		// 2) Pansement: réécrire /fr/_next/... → /_next/...
		const match = pathname.match(/^\/(fr|en)(\/._next\/.*)$/);
		if (match) {
			const newUrl = new URL(match[2], req.url); // match[2] = "/_next/..."
			return NextResponse.rewrite(newUrl);
		}
		return NextResponse.next();
	}

	// 3) Sinon, laisser l'i18n gérer
	return intl(req);
}

// 4) Matcher large : on filtre dans le code ci-dessus
export const config = {
	matcher: ['/((?!.*).*)'],
};
