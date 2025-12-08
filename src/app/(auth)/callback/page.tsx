// "use client";;
// export const dynamic = "force-dynamic";

// import { ROUTES } from "@/constants/routes";
// import { createClient } from "@/lib/supabaseClient";
// import { Spinner } from "@/theme/ui/components/spinner";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect } from "react";

// const AuthCallback = () => {
//     const supabase = createClient();
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     useEffect(() => {
//         const checkSession = async () => {
//             const { data, error } = await supabase.auth.getSession();
//             if (error) {
//                 console.error("Supabase session error:", error);
//                 router.replace(ROUTES.AUTH.LOGIN);
//                 return;
//             }
//             const redirectedFrom = searchParams.get("redirectedFrom");

//             if (data.session) {
//                 // ✅ Redirect to previous page or dashboard
//                 router.replace(redirectedFrom || ROUTES.PROTECTED.DASHBOARD.ROOT);
//             }
//             else {
//                 router.replace(ROUTES.AUTH.LOGIN);
//             }
//         };
//         checkSession();
//     }, [router, searchParams, supabase]);

//     return <Spinner isFullPage />;
// }

// export default AuthCallback;

"use client";
export const dynamic = "force-dynamic";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabaseClient";
import { Spinner } from "@/theme/ui/components/spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthCallback = () => {
    const supabase = createClient();
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.error("Supabase session error:", error);
                    router.replace(ROUTES.AUTH.LOGIN);
                    return;
                }

                const searchParams = new URLSearchParams(window.location.search);
                const redirectedFrom = searchParams.get("redirectedFrom");

                // tiny delay to ensure spinner is visible
                await new Promise((resolve) => setTimeout(resolve, 50));

                if (data.session) {
                    router.replace(redirectedFrom || ROUTES.PROTECTED.DASHBOARD.ROOT);
                } else {
                    router.replace(ROUTES.AUTH.LOGIN);
                }
            } catch (err) {
                console.error("Auth callback error:", err);
                router.replace(ROUTES.AUTH.LOGIN);
            } finally {
                setRedirecting(false);
            }
        })();
    }, [router, supabase]);

    if (redirecting) return <Spinner isFullPage />;

    return <Spinner isFullPage />;
};

export default AuthCallback;
