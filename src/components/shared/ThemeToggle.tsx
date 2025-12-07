'use client';

import { Button } from '@/theme/ui/components/button';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </Button>
    );
}
