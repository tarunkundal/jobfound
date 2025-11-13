export const ROUTES = {
    HOME: "/",

    AUTH: {
        ROOT: "/",
        LOGIN: "/login",
        SIGNUP: "/register",
        FORGOT_PASSWORD: "/password/forget",
        RESET_PASSWORD: "/password/reset",
        AUTH_CALLBACK: "/callback"
    },
    LOGOUT: '',

    PROTECTED: {
        DASHBOARD: {
            ROOT: "/dashboard",
            PROFILE: "/dashboard/profile",
            SETTINGS: "/dashboard/settings",
        },
        JOBS: {
            ROOT: "/jobs",
            DETAILS: (id: string | number) => `/jobs/${id}`,
        },
    },
} as const
