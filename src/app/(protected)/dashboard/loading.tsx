import JobCardSkeleton from "./(jobs)/_components/JobCardSkeleton";

const DashboardSkeletion = () => {
    return (
        <div className="w-[95%] mx-auto mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {Array.from({ length: 9 }).map((_, i) => (
                    <JobCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
export default DashboardSkeletion;