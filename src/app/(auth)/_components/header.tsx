'use client';

import Logo from "@/components/shared/Logo";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/theme/ui/components/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthHeader = () => {
    const currentPathname = usePathname();

    const isSignUpPage = currentPathname === ROUTES.AUTH.SIGNUP;

    const destinationHref = isSignUpPage ? ROUTES.AUTH.LOGIN : ROUTES.AUTH.SIGNUP;
    const buttonText = isSignUpPage ? 'Login' : 'Sign Up';

    return (
        <header className='flex justify-between items-center px-4 py-4 bg-primary'>
            <Logo />
            <div className='flex items-center gap-2'>
                <Button className='font-bold' variant='outline'>
                    <Link href={destinationHref}>
                        {buttonText}
                    </Link>
                </Button>
            </div>
        </header>
    );
};

export default AuthHeader;
