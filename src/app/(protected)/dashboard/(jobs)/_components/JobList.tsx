"use client"
import { GetUserType } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import DashboardSkeletion from "../../loading";
import JobCard from "./JobCard";

const JobList = ({ userData }: { userData: GetUserType }) => {
    const {
        data: fetchAllJobsFromDb,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isLoadingInfinite,
    } = trpc.jobs.getAllJobs.useInfiniteQuery(
        {
            limit: 10,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            enabled: userData.filterAiMatchedJobs === false,
            staleTime: Infinity,
        }
    );
    const fetchAIMatchedJobs = trpc.jobs.getJobsWithAIScore.useQuery(undefined, {
        staleTime: Infinity,
        enabled: userData.filterAiMatchedJobs === true,
    })

    const loadMoreRef = useRef(null);
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        if (!userData.filterAiMatchedJobs) {
            const observer = new IntersectionObserver(handleObserver, {
                root: null,
                rootMargin: "20px",
                threshold: 1.0,
            });
            if (loadMoreRef.current) {
                observer.observe(loadMoreRef.current);
            }
            return () => {
                if (loadMoreRef.current) {
                    observer.unobserve(loadMoreRef.current);
                }
                observer.disconnect();
            };
        }
    }, [handleObserver, userData.filterAiMatchedJobs]);

    const jobs = userData.filterAiMatchedJobs === true ? fetchAIMatchedJobs.data ?? [] : fetchAllJobsFromDb?.pages.flatMap(page => page.jobs) ?? []

    if (isLoadingInfinite || fetchAIMatchedJobs.isLoading) {
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
            {userData.filterAiMatchedJobs === false && (
                <div ref={loadMoreRef} className="py-8 text-center">
                    {isFetchingNextPage && <p className="text-secondary text-center">Loading more jobs...</p>}
                    {!hasNextPage && !isFetchingNextPage && jobs.length > 0 && <p className="text-secondary text-center">End of results.</p>}
                </div>
            )}
        </div>
    )
}
export default JobList