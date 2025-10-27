'use client';;
import { useState, useEffect } from 'react';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Button } from '@/theme/ui/components/button';
import Image from 'next/image';
import { Separator } from '@/theme/ui/components/separator';

const ibmPlexMono = IBM_Plex_Mono({ weight: '400', variable: '--font-mono', subsets: ['latin'] });
const ibmPlexSans = IBM_Plex_Sans({ variable: '--font-plex', subsets: ['latin'] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    return (
        <div className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} antialiased bg-primary h-full`}>
            <header className='flex justify-between items-center px-2 bg-secondary' >
                <Image src="/logo2.png" alt="Logo" width={70} height={20} title="dchvd jhsjbh" />

                <Button
                    onClick={() => setDarkMode(!darkMode)}
                >{darkMode ? 'Switch to Light' : 'Switch to Dark'}</Button>
            </header>
            <Separator />
            {children}
        </div>
    );
}
