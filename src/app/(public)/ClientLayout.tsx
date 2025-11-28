'use client';;
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useUser } from '../(auth)/_hooks/useUser';

const ibmPlexMono = IBM_Plex_Mono({ weight: '400', variable: '--font-mono', subsets: ['latin'] });
const ibmPlexSans = IBM_Plex_Sans({ variable: '--font-plex', subsets: ['latin'] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);
    useUser()
    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    return (
        <div className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} antialiased bg-body min-h-screen`}>
            {/* <header className='flex justify-between items-center px-4 py-4 bg-primary' >
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
            <Separator /> */}
            {children}
        </div>
    );
}
