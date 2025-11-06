import { prisma } from "@/db"
import { createServerClient } from "@supabase/ssr"
import type { inferAsyncReturnType } from "@trpc/server"


interface CreateContextOptions {
    req: Request
}

export async function createContext({ req }: CreateContextOptions) {
    // Create a Supabase client for the server context
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            cookies: {
                get: (key) => {
                    const cookieHeader = req.headers.get("cookie")
                    const match = cookieHeader?.match(new RegExp(`${key}=([^;]*)`))
                    return match?.[1]
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // const dbUser = user
    //     ? await prisma.user.upsert({
    //         where: { id: user.id },
    //         update: { email: user.email! },
    //         create: { id: user.id, email: user.email! },
    //     })
    //     : null

    return { supabase, user, prisma }
}

export type Context = inferAsyncReturnType<typeof createContext>
