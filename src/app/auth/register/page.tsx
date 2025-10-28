"use client";;
import useCustomToast from '@/app/hooks/useCustomToast';
import { createClient } from '@/lib/supabseClient';
import { Button } from '@/theme/ui/components/button';
import { Icon } from '@/theme/ui/components/icon';
import { Input } from '@/theme/ui/components/input';
import { Separator } from '@/theme/ui/components/separator';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import OAuthProviders from '../components/OAuthProviders';
import { ROUTES } from '@/constants/routes';

export const schema = z.object({
    email: z.string().email(),
    password: z.string().min(7, 'To short password').max(32, 'To long password'),
})

const RegisterPage = () => {
    const supabase = createClient();
    const router = useRouter();
    const toast = useCustomToast();

    const [registerWithEmailPassword, setRegisterWithEmailPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = schema.safeParse({ email, password });
        if (!result.success) {
            toast({
                title: 'Invalid input',
                description: result.error?.issues.map((issue: { message: any; }) => issue.message).join(', '),
                status: 'error',
            })
            return;
        }
        setLoading(true);
        try {
            // Check if the user already exists
            const { data: existingUser } = await supabase
                .from('users') // assuming you have a users table
                .select('id')
                .eq('email', email)
                .single();

            if (existingUser) {
                toast({
                    title: 'User already registered',
                    description: 'You already have an account. Please login.',
                    status: 'warning',
                });
                setLoading(false);
                return;
            }

            // Sign up new user
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            setLoading(false);

            if (error && !data?.user) {
                // Handle other signUp errors
                toast({
                    title: 'Error registering',
                    description: error.message,
                    status: 'error',
                });
            } else {
                toast({
                    title: 'Registration successful',
                    description: 'Please check your email to verify your account.',
                    status: 'success',
                });
                router.push(ROUTES.AUTH.LOGIN);
                // router.push('/auth/check-email?email=' + encodeURIComponent(email))
            }
        } catch (err: any) {
            setLoading(false);
            toast({
                title: 'Error',
                description: err.message || 'Something went wrong',
                status: 'error',
            });
        }
    };

    return (
        <div className="w-[80%] my-[10%] flex flex-col">
            <h1 className='text-2xl font-medium text-center my-4 text-brand-foreground'>Create a JobFound account</h1>
            <div className=' flex flex-col items-center gap-2 p-4'>
                <OAuthProviders />
                <span className='text-brand-foreground'>or</span>
                <Button size='lg' prefixNode={<Icon icon={Mail} />} variant='ghost' className='w-full'
                    onClick={() => setRegisterWithEmailPassword(!registerWithEmailPassword)}
                >Email & Password</Button>

                {registerWithEmailPassword && <form className='w-full flex flex-col items-center gap-4 p-4' onSubmit={handleRegister} >
                    <Input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <Button
                        variant='default'
                        type="submit"
                        className='w-full'
                        size='lg'
                        isLoading={loading}
                        disabled={loading}
                    >
                        Register
                    </Button>
                </form>}
                <Separator />
                <p className='text-primary text-xxs text-center'>By continuing, you agree to JobFound's
                    <b> Terms of Service</b> and <b>Privacy Policy</b></p>
                <p className='text-xxs text-tertiary'>
                    Already have an account?
                    <Link href={ROUTES.AUTH.LOGIN}>
                        <Button variant='link'>Log In</Button>
                    </Link>
                </p>
                <p className='text-xxs text-primary'>
                    This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply.
                </p>
            </div>
        </div>

    )
}

export default RegisterPage