import { trpc } from "@/utils/trpc";
import DashboardSkeletion from "../loading";
import JobCard from "./_components/JobCard";
import { GetUserType } from "@/types/user";

const JobList = ({ userData }: { userData: GetUserType }) => {
    const fetchAllJobs = trpc.jobs.getAllJobs.useQuery(undefined, {
        staleTime: Infinity,
    })
    const jobs = fetchAllJobs.data ?? []

    if (fetchAllJobs.isLoading) {
        return <DashboardSkeletion />
    }

    return (
        <div className="w-[95%] mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-primary">Job Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        userData={userData}
                    />
                ))}
            </div>
        </div>
    )
}
export default JobList