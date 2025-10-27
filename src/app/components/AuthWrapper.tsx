"use client"

import { Spinner } from "@/theme/ui/components/spinner"
import { useUser } from "../auth/hooks/useUser"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser()
    const router = useRouter()

    useEffect(() => {
        // Redirect unauthenticated users to login
        if (!loading && !user) {
            router.replace("/auth/login")
        }
    }, [loading, user, router])

    if (loading)
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex justify-center items-center gap-2">
                    <Spinner />
                    <p className="text-primary">Checking authentication...</p>
                </div>
            </div>
        )

    if (!user) return null // Prevent flashing of protected content

    return <>{children}</>
}
