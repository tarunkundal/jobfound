"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabseClient"

export function useUser() {
    const supabase = createClient()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // ✅ Fetch user session on mount
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            setUser(user ?? null)
            setLoading(false)
        }

        getUser()

        // ✅ Listen for sign in/out changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // ✅ Clean up listener on unmount
        return () => {
            subscription.unsubscribe()
        }
    }, [supabase])

    return { user, loading }
}
