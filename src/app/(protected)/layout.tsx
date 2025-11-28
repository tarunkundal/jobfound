import DashboardHeader from "./_components/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>
        <DashboardHeader />
        <div className="h-auto px-2 pt-20">
            {children}
        </div>
    </>
}
