'use client';
import { useState, useEffect } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <button
                className="m-4 p-2 rounded bg-brand text-primary"
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? 'Switch to Light' : 'Switch to Dark'}
            </button>
            {children}
        </div>
    );
}
