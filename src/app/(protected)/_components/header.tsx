'use client';

import Logo from "@/components/shared/Logo";
import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabseClient";
import { Button } from "@/theme/ui/components/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const DashboardHeader = () => {
    const currentPathname = usePathname();
    const [loading, setLoading] = useState<boolean>(false);
    const supabase = createClient();
    const router = useRouter();

    const navItems = [
        { name: 'Dashboard', href: ROUTES.PROTECTED.DASHBOARD.ROOT },
        { name: 'Profile', href: ROUTES.PROTECTED.PROFILE },
        { name: 'Settings', href: ROUTES.PROTECTED.SETTINGS },
    ];

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push("/login");
    };
    return (
        <header className='flex justify-between items-center px-4 py-4 bg-primary fixed top-0 left-0 right-0 z-10 border-b-[1px] border-b-neutral-700'>
            <Logo />
            <div className='flex items-center gap-4'>
                {navItems.map((item) => {
                    const isActive = currentPathname === item.href;

                    return (
                        <Link key={item.name} href={item.href}>
                            <Button
                                variant="ghost"
                                className={isActive ? 'text-primary font-semibold' : 'text-secondary'}
                            >
                                {item.name}
                            </Button>
                        </Link>
                    );
                })}
                <Button variant="destructive" onClick={handleLogout} isLoading={loading}>
                    Sign Out
                </Button>
            </div>
        </header>
    );
};

export default DashboardHeader;
