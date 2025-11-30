export default function JobCardSkeleton() {
    return (
        <div className="p-4 shadow-sm bg-card-hover shadow-card border-card rounded-card h-full min-h-[360px] flex justify-between animate-pulse">

            {/* Badges */}
            <div className="flex items-center justify-between mb-3">
                <div className="h-5 w-44 bg-muted rounded-md" />
                <div className="h-5 w-16 bg-muted rounded-md" />
            </div>

            {/* Body */}
            <div className="flex flex-col gap-3 flex-1">

                {/* Company */}
                <div className="h-4 w-32 bg-muted rounded-md" />

                {/* Title */}
                <div className="h-5 w-48 bg-muted rounded-md" />

                {/* Meta */}
                <div className="flex gap-3 mt-2">
                    <div className="h-4 w-20 bg-muted rounded-md" />
                    <div className="h-4 w-24 bg-muted rounded-md" />
                    <div className="h-4 w-28 bg-muted rounded-md" />
                </div>

                {/* Salary + Company Btn */}
                <div className="flex items-center justify-between my-2">
                    <div className="h-6 w-32 bg-muted rounded-md" />
                    <div className="h-8 w-20 bg-muted rounded-md" />
                </div>

                {/* Job Description Button */}
                <div className="h-10 w-full bg-muted rounded-md" />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between mt-4">
                <div className="h-9 w-28 bg-muted rounded-md" />
                <div className="h-9 w-28 bg-muted rounded-md" />
            </div>

        </div>
    );
}
