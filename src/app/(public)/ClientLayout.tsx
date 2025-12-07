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
            {children}
        </div>
    );
}
