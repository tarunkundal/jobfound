import { api } from "@/server/trpc/server";

const HeaderToDisplayName = async () => {
    const caller = await api();
    const userData = await caller.user.getUser()
    const userName = userData?.fullName != null && userData?.fullName != "" && userData?.fullName != 'Unknown' ? userData.fullName : userData?.email
    return (
        <h1 className="text-2xl font-semibold text-brand-foreground">Welcome, <span className="text-brand">{userName}</span></h1>

    )
}

export default HeaderToDisplayName