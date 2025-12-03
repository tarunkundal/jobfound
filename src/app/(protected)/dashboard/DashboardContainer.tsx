import { api } from "@/server/trpc/server";
import { Suspense } from "react";
import OnboardingPage from "../onboarding/page";
import JobList from "./(jobs)/_components/JobList";
import JobFilter from "./(jobs)/jobfilters/JobFilter";
import DashboardSkeletion from "./loading";

const DashboardContainer = async () => {
    const caller = await api();
    const userData = await caller.user.getUser()

    return (
        <div className="flex flex-col p-2 gap-4">
            {
                !userData?.isOnboarded ?
                    <OnboardingPage /> : (
                        <Suspense fallback={<DashboardSkeletion />}>
                            <JobFilter userData={userData} />
                            <JobList userData={userData} />
                        </Suspense>
                    )
            }
        </div>
    )
}

export default DashboardContainer