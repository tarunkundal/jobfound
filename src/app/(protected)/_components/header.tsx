'use client';;
import Logo from "@/components/shared/Logo";
import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabseClient";
import { Button } from "@/theme/ui/components/button";
import { Spinner } from "@/theme/ui/components/spinner";
import Link, { useLinkStatus } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";


const DashboardHeader = () => {
    const { pending } = useLinkStatus()
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
        router.push(ROUTES.AUTH.LOGIN);
    };
    console.log('linkstatus', pending);

    return (
        <header className='flex justify-between items-center px-4 py-4 bg-primary fixed top-0 left-0 right-0 z-10 border-b-[1px] border-b-neutral-700'>
            <Logo />
            <div className='flex items-center gap-4'>
                {navItems.map((item) => {
                    const isActive = currentPathname === item.href;

                    return (
                        <Button
                            key={item.name}
                            asChild
                            variant='ghost'
                            disabled={pending}
                            prefixNode={pending ? <Spinner /> : null}
                            className={isActive ? 'text-primary font-semibold' : 'text-secondary'}
                        >
                            <Link href={item.href} prefetch>
                                {item.name} {pending && <Spinner />}
                            </Link>
                        </Button>

                        // <Link key={item.name} href={item.href} prefetch>
                        //     <Button
                        //         variant='ghost'
                        //         disabled={pending}
                        //         prefixNode={pending ? <Spinner /> : null}
                        //         className={isActive ? 'text-primary font-semibold' : 'text-secondary'}
                        //     >
                        //         <span>{item.name}</span>
                        //     </Button>
                        // </Link>
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
