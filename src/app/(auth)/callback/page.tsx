"use client";;
export const dynamic = "force-dynamic";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabaseClient";
import { Spinner } from "@/theme/ui/components/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const AuthCallback = () => {
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Supabase session error:", error);
                router.replace(ROUTES.AUTH.LOGIN);
                return;
            }
            const redirectedFrom = searchParams.get("redirectedFrom");

            if (data.session) {
                // ✅ Redirect to previous page or dashboard
                router.replace(redirectedFrom || ROUTES.PROTECTED.DASHBOARD.ROOT);
            }
            else {
                router.replace(ROUTES.AUTH.LOGIN);
            }
        };
        checkSession();
    }, [router, searchParams, supabase]);

    return <Spinner isFullPage />;
}

export default AuthCallback;