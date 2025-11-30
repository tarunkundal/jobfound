import { trpc } from "@/utils/trpc";
import JobCard from "./JobCard";
import JobCardSkeleton from "./loading";

const JobList = () => {
    const fetchAllJobs = trpc.jobs.getAllJobs.useQuery(undefined, {
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
    const jobs = fetchAllJobs.data ?? []

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
                {/* <Suspense fallback={Array.from({ length: 9 }).map((_, i) => (
                    <JobCardSkeleton key={i} />
                ))}> */}
                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                    />
                ))}
                {/* </Suspense> */}
            </div>
        </div>
    )
}
export default JobList