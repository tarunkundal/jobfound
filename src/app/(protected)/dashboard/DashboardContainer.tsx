"use client";
import { trpc } from "@/utils/trpc";
import OnboardingPage from "../onboarding/page";
import JobList from "./(jobs)/JobList";
import { Spinner } from "@/theme/ui/components/spinner";

const DashboardContainer = () => {
    const { data: getUserData, isLoading: userDataLoading } = trpc.user.getUser.useQuery(undefined, {
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    if (userDataLoading) {
        return <Spinner isFullPage={true} />
    }
    return (
        <div className="flex flex-col p-2 gap-4">
            {
                !getUserData?.isOnboarded ?
                    <OnboardingPage /> :
                    <JobList />
            }
        </div>
    )
}

export default DashboardContainer