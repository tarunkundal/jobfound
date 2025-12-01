"use client";;
import { trpc } from "@/utils/trpc";
import OnboardingPage from "../onboarding/page";
import JobList from "./(jobs)/JobList";
import DashboardSkeletion from "./loading";

const DashboardContainer = () => {
    const { data: getUserData, isLoading: userDataLoading } = trpc.user.getUser.useQuery(undefined, {
        staleTime: Infinity,
    });

    if (userDataLoading) {
        // return <Spinner isFullPage={true} />
        return <DashboardSkeletion />
    }
    return (
        <div className="flex flex-col p-2 gap-4">
            {
                !getUserData?.isOnboarded ?
                    <OnboardingPage /> :
                    <JobList userData={getUserData} />
            }
        </div>
    )
}

export default DashboardContainer