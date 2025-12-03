import { prisma } from "@/db";
import { appRouter } from "@/server/trpc/routers";
import { createServerClient } from "@supabase/ssr";

// FOR SERVER COMPONENTS ONLY
export async function serverContext() {
    // Read cookies using Next.js server APIs
    const cookieStore = await require("next/headers").cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                get: (key) => cookieStore.get(key)?.value,
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return { supabase, user, prisma };
}

// Create a server-side caller
export async function api() {
    return appRouter.createCaller(await serverContext());
}
