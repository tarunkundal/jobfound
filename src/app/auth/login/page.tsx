"use client";;
import useCustomToast from '@/app/hooks/useCustomToast';
import { createClient } from '@/lib/supabseClient';
import { Button } from '@/theme/ui/components/button';
import { Input } from '@/theme/ui/components/input';
import { Separator } from '@/theme/ui/components/separator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { schema } from '../register/page';
import OAuthProviders from '../components/OAuthProviders';
import { ROUTES } from '@/constants/routes';

const LoginPage = () => {
    const supabase = createClient();
    const router = useRouter();
    const toast = useCustomToast();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = schema.safeParse({ email, password });
        if (!result.success) {
            setLoading(false);
            toast({
                title: 'Invalid input',
                description: result.error?.issues.map((issue: { message: any; }) => issue.message).join(', '),
                status: 'error',
            });
            return;
        }

        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);

        // Handle case where there's no user registered for the given email
        if (error && (!data || !('user' in data) || (data as any).user == null)) {
            const msg = (error.message || '').toLowerCase();
            const isNoUser = msg.includes('user') || msg.includes('not found') || msg.includes('invalid') || error.status === 400 || error.status === 404;

            if (isNoUser) {
                toast({
                    title: 'No account found',
                    description: 'No account exists for this email. Please register first.',
                    status: 'warning',
                });
                // router.push('/auth/register');
                return;
            }

            toast({
                title: 'Error logging in',
                description: error.message,
                status: 'error',
            });
            return;
        }
        if (data.user) {
            toast({
                title: 'Login successful',
                description: 'Welcome back!',
                status: 'success',
            });
            router.push(ROUTES.PROTECTED.DASHBOARD.ROOT);
        }
    }

    return (
        <div className="w-[80%] my-[10%] flex flex-col">
            <h1 className='text-3xl font-medium text-center my-4 text-brand-foreground'>Log in to your account</h1>
            <form className='w-full flex flex-col items-center gap-4 p-4' onSubmit={handleLogin} >
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant='default'
                    type="submit"
                    className='w-full'
                    size='lg'
                    isLoading={loading}
                    disabled={loading}
                >
                    Log In
                </Button>
            </form>
            <Button variant='link' className='mt-2'>
                <Link href={ROUTES.AUTH.FORGOT_PASSWORD}>
                    Forget Password
                </Link>
            </Button>
            <div className='flex flex-col items-center gap-2 p-4'>
                <OAuthProviders />
                <Separator />
                <p className='text-xxs text-tertiary'>
                    New to JobFound?
                    <Link href={ROUTES.AUTH.SIGNUP} >
                        <Button variant='link'>Register</Button>
                    </Link>
                </p><p className='text-primary text-xxs text-center'>This site is protected by reCAPTCHA Enterprise and the Google <span className='underline'> Privacy Policy</span> and <span className='underline' >Terms of Service</span> apply.</p>
            </div>
        </div>
    )
}

export default LoginPage