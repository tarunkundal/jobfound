import { Spinner } from "@/theme/ui/components/spinner";
import OnboardingPage from "../onboarding/page";
import JobList from "./_components/jobs/JobList";
import { trpc } from "@/utils/trpc";

const DashboardContainer = () => {
    const { data: getUserData, isLoading: userDataLoading } = trpc.user.getUser.useQuery();

    if (userDataLoading) {
        return <Spinner isFullPage={true} />
    }
    return (
        <div className="flex flex-col p-2 gap-4">
            {
                !getUserData?.isOnboarded ?
                    <OnboardingPage /> :
                    <JobList />}
        </div>
    )
}

export default DashboardContainer