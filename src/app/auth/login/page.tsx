import { Button } from '@/theme/ui/components/button';
import { Icon } from '@/theme/ui/components/icon';
import { Input } from '@/theme/ui/components/input';
import { Separator } from '@/theme/ui/components/separator';
import { AppleIcon, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {

    return (
        <div className="w-[60%] flex flex-col my-auto">
            <h1 className='text-3xl font-medium text-center my-4 text-primary'>Log in to your account</h1>
            <form className='w-full flex flex-col items-center gap-4 p-4' >
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
                    Log In
                </Button>
                <Button variant='link' className='mt-2'>Forget Password</Button>
            </form>
            <div className=' flex flex-col items-center gap-2 p-4'>
                <Button size='lg' prefixNode={<Image src={'/google.svg'} alt='google' width={20} height={20} />} variant='outline' className='w-full'>Continue with Google</Button>
                <Button size='lg' prefixNode={<Icon icon={AppleIcon} />} variant='outline' className='w-full'>Continue with Apple</Button>
                <Button size='lg' prefixNode={<Icon icon={Github} />} variant='outline' className='w-full'>Continue with SSO</Button>
                <Separator />
                <p className='text-xxs text-tertiary'>
                    New to JobFound?
                    <Link href="/auth/register" >
                        <Button variant='link'>Register</Button>
                    </Link>
                </p><p className='text-secondary text-xxs text-center'>This site is protected by reCAPTCHA Enterprise and the Google <span className='underline'> Privacy Policy</span> and <span className='underline' >Terms of Service</span> apply.</p>
            </div>
        </div>
    )
}

export default LoginPage