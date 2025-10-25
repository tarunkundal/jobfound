import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return req.cookies.get(name)?.value
                },
                set(name: string, value: string, options: any) {
                    res.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: any) {
                    res.cookies.delete({ name, ...options })
                },
            },
        }
    )

    const { data: { user }, } = await supabase.auth.getUser()
    const path = req.nextUrl.pathname

    // Example: Protect protected routes
    if (!user && path.startsWith("/protected")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = "/auth/login"
        redirectUrl.searchParams.set("redirectedFrom", path)
        return NextResponse.redirect(redirectUrl)
    }

    // 🚀 Redirect logged-in users away from landing page
    if (user && (path === "/auth/login" || path === "/auth/register" || path === "/")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = "/protected/dashboard"
        return NextResponse.redirect(redirectUrl)
    }

    // Return the response (always required)
    return res
}

export const config = {
    matcher: ["/", "/protected/:path*", "/auth/:path"], // Protects everything under /proteceted folder
}
