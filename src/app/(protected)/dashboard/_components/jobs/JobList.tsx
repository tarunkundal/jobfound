import { trpc } from "@/utils/trpc";
import JobCardSkeleton from "../skeletons/JobCardSkeleton";
import JobCard from "./JobCard";

const JobList = () => {
    const fetchAllJobs = trpc.jobs.getAllJobs.useQuery()
    const data = fetchAllJobs.data ?? []

    return (
        <div className="w-[95%] mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-primary">Job Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {
                    fetchAllJobs.isLoading && (
                        Array.from({ length: 9 }).map((_, i) => (
                            <JobCardSkeleton key={i} />
                        ))
                    )
                }
                {data.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                    />
                ))}
            </div>
        </div>
    )
}
export default JobList