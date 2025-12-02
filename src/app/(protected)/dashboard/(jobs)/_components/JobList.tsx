"use client"
import { GetUserType } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { notFound } from "next/navigation";
import DashboardSkeletion from "../../loading";
import JobCard from "./JobCard";

const JobList = ({ userData }: { userData: GetUserType }) => {
    const fetchAllJobsFromDb = trpc.jobs.getAllJobs.useQuery(undefined, {
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: userData.filterAiMatchedJobs === false
    })
    const fetchAIMatchedJobs = trpc.jobs.getJobsWithAIScore.useQuery(undefined, {
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: userData.filterAiMatchedJobs === true,
    })
    const jobs = userData.filterAiMatchedJobs === true ? fetchAIMatchedJobs.data ?? [] : fetchAllJobsFromDb.data ?? []

    if (fetchAllJobsFromDb.isLoading || fetchAIMatchedJobs.isLoading) {
        return <DashboardSkeletion />
    }

    if (!jobs.length) return notFound()

    return (
        <div className="w-[95%] mx-auto">
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