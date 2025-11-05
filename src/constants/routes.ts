export const ROUTES = {
    HOME: "/",

    AUTH: {
        ROOT: "/auth",
        LOGIN: "/auth/login",
        SIGNUP: "/auth/register",
        FORGOT_PASSWORD: "/auth/password/forget",
        RESET_PASSWORD: "/auth/password/reset",
        AUTH_CALLBACK: "/auth/callback"
    },
    LOGOUT: '',

    PROTECTED: {
        DASHBOARD: {
            ROOT: "/protected/dashboard",
            PROFILE: "/protected/dashboard/profile",
            SETTINGS: "/protected/dashboard/settings",
        },
        JOBS: {
            ROOT: "/jobs",
            DETAILS: (id: string | number) => `/jobs/${id}`,
        },
    },
} as const
