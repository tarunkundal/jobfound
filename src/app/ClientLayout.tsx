'use client';;
import { useState, useEffect } from 'react';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import Logo from '@/components/shared/Logo';
import { Button } from '@/theme/ui/components/button';
import { Separator } from '@/theme/ui/components/separator';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const ibmPlexMono = IBM_Plex_Mono({ weight: '400', variable: '--font-mono', subsets: ['latin'] });
const ibmPlexSans = IBM_Plex_Sans({ variable: '--font-plex', subsets: ['latin'] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    return (
        <div className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} antialiased bg-primary min-h-screen`}>
            <header className='flex justify-between items-center px-4 py-4 bg-secondary' >
                <Logo />

                <div className='flex items-center gap-2'>
                    <Button
                        onClick={() => setDarkMode(!darkMode)}
                    >{darkMode ? 'Switch to Light' : 'Switch to Dark'}
                    </Button>
                    <Button variant='outline' className='font-bold'>
                        <Link href={ROUTES.AUTH.SIGNUP}>
                            Sign In
                        </Link>
                    </Button>
                </div>
            </header>
            <Separator />
            {children}
        </div>
    );
}
