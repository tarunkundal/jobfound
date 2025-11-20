"use client";
import { ROUTES } from '@/constants/routes';
import useCustomToast from '@/hooks/useCustomToast';
import { createClient } from '@/lib/supabseClient';
import { Button } from '@/theme/ui/components/button';
import { Icon } from '@/theme/ui/components/icon';
import { AppleIcon, Github } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const OAuthProviders = () => {
    const supabase = createClient();
    const toast = useCustomToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginUpWithGoogle = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/callback?redirectedFrom=${ROUTES.PROTECTED.DASHBOARD.ROOT}`
                // redirectTo: `${window.location.origin}${ROUTES.AUTH.AUTH_CALLBACK}?redirectedFrom=${encodeURIComponent(
                //     ROUTES.PROTECTED.DASHBOARD.ROOT
                // )}`,
            },
        });
        console.log('dshfgsbds', data, error);

        setIsLoading(false);
        if (error) {
            toast({
                title: 'Error logging in',
                description: error.message,
                status: 'error',
            })
        } else {
            toast({
                title: 'Success',
                description: 'Redirecting to Google for authentication.',
                status: 'success',
            })
        }
    }

    return (
        <div className=' flex flex-col gap-2 w-full'>
            <Button size='lg' isLoading={isLoading} prefixNode={<Image src={'/google.svg'} alt='google' width={20} height={20} />} variant='outline' className='w-full' onClick={loginUpWithGoogle}>Continue with Google</Button>
            <Button size='lg' prefixNode={<Icon icon={AppleIcon} />} variant='outline' className='w-full'>Continue with Apple</Button>
            <Button size='lg' prefixNode={<Icon icon={Github} />} variant='outline' className='w-full'>Continue with SSO</Button>
        </div>
    )
}

export default OAuthProviders