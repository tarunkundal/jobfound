import AuthWrapper from "../components/AuthWrapper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <AuthWrapper>
        <div className="flex h-auto">
            {children}
        </div>
    </AuthWrapper>
}
