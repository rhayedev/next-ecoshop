import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface HeaderLinkProps {
    title: string;
    href: string;
}

export default function HeaderLink({ title, href }: HeaderLinkProps) {
    const pathname = usePathname();
    const isActive = (href: string) => (pathname === href ? "active" : "");

    const t = useTranslations("nav");

    return (
        <Link href={href} className="group relative w-24 gap-1 sm:block hidden">
            <p className="w-full h-fit flex-center">{t(title)}</p>
            <hr
                className={`group-hover:w-full -bottom-2 absolute w-0 border-none h-1 transition-all ease-in-out duration-700 z-20
                ${isActive(href) ? "bg-violet-500 w-full" : "bg-violet-300"}
                `}
            />
            <hr
                className={`group-hover:w-full z-10 -bottom-2 absolute w-0 border-none h-1 trans-fast
                ${isActive(href) ? "bg-white w-full" : "bg-gray-200"}
                `}
            />
        </Link>
    );
}
