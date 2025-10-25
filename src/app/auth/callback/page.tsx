"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabseClient";
import { Spinner } from "@/theme/ui/components/spinner";

export default function AuthCallback() {
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            const redirectedFrom = searchParams.get("redirectedFrom");

            if (data.session) {
                // ✅ Redirect to previous page or dashboard
                router.replace(redirectedFrom || "/protected/dashboard");
            } else {
                router.replace("/auth/login");
            }
        };
        checkSession();
    }, [router, searchParams, supabase]);

    return <Spinner />;
}
