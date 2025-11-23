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
    const isProtectedRoute = path.startsWith("/dashboard") || path.startsWith("/settings") || path.startsWith("/onboarding")

    // Example: Protect protected routes
    if (!user && isProtectedRoute) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = "/login"
        redirectUrl.searchParams.set("redirectedFrom", path)
        return NextResponse.redirect(redirectUrl)
    }

    // 🚀 Redirect logged-in users away from landing page
    if (user && (path === "/login" || path === "/register" || path === "/")) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = "/dashboard"
        return NextResponse.redirect(redirectUrl)
    }

    // Return the response (always required)
    return res
}

export const config = {
    matcher: ["/",
        "/login",
        "/register",
        "/dashboard/:path*",
        "/settings/:path*",
        "/onboarding/:path*",], // Protects everything under /proteceted folder
}
