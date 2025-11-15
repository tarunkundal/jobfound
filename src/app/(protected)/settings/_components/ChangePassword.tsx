"use client"
import { ROUTES } from "@/constants/routes"
import { Button } from "@/theme/ui/components/button"
import { useRouter } from "next/navigation"

const ChangePassword = () => {
    const router = useRouter()
    return (
        <Button variant={'secondary'} onClick={() => router.push(ROUTES.AUTH.RESET_PASSWORD)}>Change Password</Button>
    )
}

export default ChangePassword