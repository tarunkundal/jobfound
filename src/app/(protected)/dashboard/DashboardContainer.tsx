"use client"
import { trpc } from "@/utils/trpc";
import OnboardingPage from "../onboarding/page";
import JobsWrapper from "./(jobs)/_components/JobsWrapper";
import DashboardSkeletion from "./loading";

const DashboardContainer = () => {
    const { data: userData, isLoading } = trpc.user.getUser.useQuery(undefined, { staleTime: Infinity })

    if (isLoading) return <DashboardSkeletion />
    return (
        <div className="flex flex-col p-2 gap-4">
            {
                !userData?.isOnboarded ?
                    <OnboardingPage /> : (
                        <JobsWrapper userData={userData} />
                    )
            }
        </div>
    )
}

export default DashboardContainer