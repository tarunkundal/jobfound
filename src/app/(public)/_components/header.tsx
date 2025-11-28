import Logo from '@/components/shared/Logo'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/theme/ui/components/button'
import { Separator } from '@/theme/ui/components/separator'
import Link from 'next/link'

const HomeHeader = () => {
    return (<>
        <header className='flex justify-between items-center px-4 py-4 bg-primary' >
            <Logo />

            <div className='flex items-center gap-2'>
                <Button variant='outline' className='font-bold'>
                    <Link href={ROUTES.AUTH.SIGNUP}>
                        Sign In
                    </Link>
                </Button>
            </div>
        </header>
        <Separator />
    </>
    )
}

export default HomeHeader