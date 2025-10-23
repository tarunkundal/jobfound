"use client";
import { Button } from '@/theme/ui/components/button';
import { Icon } from '@/theme/ui/components/icon';
import { Input } from '@/theme/ui/components/input';
import { Separator } from '@/theme/ui/components/separator';
import { AppleIcon, Github, Mail, } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const RegisterPage = () => {
    const [registerWithEmailPassword, setRegisterWithEmailPassword] = useState(false);
    return (
        <div className="w-[60%] flex flex-col my-auto">
            <h1 className='text-2xl font-medium text-center my-4 text-primary'>Create a JobFound account</h1>
            <div className=' flex flex-col items-center gap-2 p-4'>
                <Button prefixNode={<Image src={'/google.svg'} alt='sso image' width={15} height={15} />} variant='secondary' className='w-full'>Continue with Google</Button>
                <Button size='lg' prefixNode={<Icon icon={AppleIcon} />} variant='secondary' className='w-full'>Continue with Apple</Button>
                <Button prefixNode={<Icon icon={Github} />} variant='secondary' className='w-full'>Continue with Google</Button>
                <span className='text-primary'>or</span>
                <Button size='lg' prefixNode={<Icon icon={Mail} />} variant='ghost' className='w-full'
                    onClick={() => setRegisterWithEmailPassword(!registerWithEmailPassword)}
                >Email & Password</Button>

                {registerWithEmailPassword && <form className='w-full flex flex-col items-center gap-4 p-4' >
                    <Input
                        type="email"
                        placeholder="Email"
                    />
                    <Input
                        type="password"
                        placeholder="Password"

                    />
                    <Button
                        variant='default'
                        type="submit"
                        className='w-full'
                        size='lg'
                    >
                        Register
                    </Button>
                </form>}
                <Separator />
                <p className='text-secondary text-xxs text-center'>By continuing, you agree to JobFound's
                    <b> Terms of Service</b> and <b>Privacy Policy</b></p>
                <p className='text-xxs text-tertiary'>
                    Already have an account?
                    <Link href="/auth/login">
                        <Button variant='link'>Log In</Button>
                    </Link>
                </p>
                <p className='text-xxs text-tertiary'>
                    This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply.
                </p>
            </div>
        </div>

    )
}

export default RegisterPage