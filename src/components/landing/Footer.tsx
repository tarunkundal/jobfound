import { ROUTES } from "@/constants/routes"
import { Button } from "@/theme/ui/components/button"
import { Separator } from "@/theme/ui/components/separator"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="w-full flex flex-col gap-6 justify-center items-center text-center">
            <Separator />
            <div className="mt-8">
                <Button
                    className="px-6 py-5 font-semibold text-lg"
                >
                    <Link href={ROUTES.AUTH.SIGNUP}>
                        Sign Up Now!
                    </Link>
                </Button>
            </div>
            <h2 className="text-4xl font-bold text-primary">Contact Us</h2>
            <h2 className="text-2xl text-secondary">Have questions? Reach out to us at
                <span className="text-brand">

                    <Link href={''}>
                        {' '} support@jobfound.ai
                    </Link>
                </span>
            </h2>
        </div>
    )
}

export default Footer