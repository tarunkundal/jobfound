"use client"

import { useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabseClient"

export function useUser() {
    const supabase = createClient()
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch user & user session on mount
        const getUserAndSession = async () => {
            const { data: { session }, } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            setSession(session ?? null)
            setLoading(false)
        }

        getUserAndSession()

        // ✅ Listen for sign in/out changes
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setSession(session ?? null)
            setLoading(false)
        })

        // ✅ Clean up listener on unmount
        return () => {
            subscription.unsubscribe()
        }
    }, [supabase])

    return { user, loading, session }
}
