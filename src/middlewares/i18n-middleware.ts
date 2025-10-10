import createMiddleware from 'next-intl/middleware';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

const intl = createMiddleware({
    locales: ['fr', 'en'],
    defaultLocale: 'fr'
});

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1) Laisser passer toutes les requêtes d'assets/techniques :
    //    - vrai _next à la racine
    //    - _next préfixé par locale /fr/_next, /en/_next (devrait pas arriver, mais au cas où)
    //    - fichiers statiques avec extension (.js, .css, .png, etc.)
    //    - .well-known
    //    - API
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/_next/') ||               // couvre aussi /fr/_next
        pathname.startsWith('/api') ||
        pathname.startsWith('/.well-known') ||
        /\.[a-z0-9]+$/i.test(pathname)                // un fichier avec extension
    ) {
        // 2) Pansement: si on a /fr/_next/... ou /en/_next/... => réécrire vers /_next/...
        const match = pathname.match(/^\/(fr|en)(\/_next\/.*)$/);
        if (match) {
            const newUrl = new URL(match[2], req.url);  // match[2] = "/_next/..."
            return NextResponse.rewrite(newUrl);
        }
        return NextResponse.next();
    }

    // 3) Sinon, laisser l'i18n gérer
    return intl(req);
}

// 4) Matcher large (on filtre nous-mêmes dans le code ci-dessus)
export const config = {
    matcher: ['/((?!.*).*)']
};
