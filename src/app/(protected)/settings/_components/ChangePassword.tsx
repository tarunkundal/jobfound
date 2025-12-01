import { ROUTES } from "@/constants/routes"
import { Button } from "@/theme/ui/components/button"
import Link from "next/link"

const ChangePassword = () => {
    return (
        <Link href={ROUTES.AUTH.RESET_PASSWORD}>
            <Button variant={'secondary'}>Change Password</Button>
        </Link>
    )
}

export default ChangePassword