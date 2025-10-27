// "use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export const Logo = () => {
    return (
        <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 group cursor-pointer"
        >
            <Image
                src="/logobg.png"
                alt="JobFound Logo"
                width={40}
                height={40}
                priority
            />
            <h2 className="text-primary font-extrabold text-xl tracking-tight">
                JobFound
            </h2>
        </Link>
    );
};

export default Logo;
