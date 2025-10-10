import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const intl = createMiddleware({
    locales: ["fr", "en"],
    defaultLocale: "fr",
});

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (
        pathname.startsWith("/_next") ||
        pathname.includes("/_next/") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/.well-known") ||
        /\.[a-z0-9]+$/i.test(pathname)
    ) {
        const match = pathname.match(/^\/(fr|en)(\/_next\/.*)$/);
        if (match) {
            const newUrl = new URL(match[2], req.url);
            return NextResponse.rewrite(newUrl);
        }
        return NextResponse.next();
    }

    return intl(req);
}

export const config = {
    matcher: ["/((?!.*).*)"],
};
