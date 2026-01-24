"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Props = {
    icon: React.ReactNode;
    text: string;
    href: string;
};

const QuickActions = ({ icon, text, href }: Props) => {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
        <Link 
            href={href}
            className={clsx(
                "flex items-center justify-center gap-2 cursor-pointer w-full px-4 py-3 rounded-lg ease-in-out duration-200",
                isActive 
                    ? "bg-primary text-white hover:bg-primary-hover" 
                    : "text-neutral-500 border border-neutral-500 hover:bg-primary hover:text-white hover:border-primary"
            )}
            aria-label={text}
        >
            <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
            <p className="text-sm font-medium">{text}</p>
        </Link>
    );
};
 
export default QuickActions;