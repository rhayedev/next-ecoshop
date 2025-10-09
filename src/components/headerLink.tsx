import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

interface HeaderLinkProps {
    title: string;
    href: string;
}

export default function HeaderLink({ title, href }: HeaderLinkProps) {
    const pathname = usePathname();
    const isActive = (href: string) => (pathname === href ? "active" : "");

    const { t } = useTranslation();

    return (
        <Link href={href} className="group relative w-24 gap-1">
            <p className="w-full h-fit flex-center">{t(title)}</p>
            <hr
                className={`group-hover:w-full -bottom-2 absolute w-0 border-none h-1 trans-fast
                ${isActive(href) ? "bg-violet-300 w-full" : "bg-gray-200"}
                `}
            />
        </Link>
    );
}
