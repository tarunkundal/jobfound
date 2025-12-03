// This could be placed in a file like src/components/shared/UploadSkeleton.tsx
import React from 'react';
import SkeletonLoader from './SkeletionLoader';

const UploadSkeleton: React.FC = () => {
    return (
        // Mimics the container styling of the original component
        <div className="w-[90%] bg-primary my-[2%] mx-auto px-6 py-6 flex flex-col gap-6 border-card rounded-card animate-pulse">

            {/* Skeleton for the Title and Description text block */}
            <div>
                <h2 className="text-brand-foreground text-2xl font-semibold">Upload Your Resume</h2>
                <p className="text-secondary">Let our AI do the heavy lifting! Upload your resume to automatically fill out your profile details — saving you time and effort while ensuring accuracy.</p>
            </div>

            {/* Mimics the centering and width constraints */}
            <div className="w-[90%] md:w-[60%] lg:w=[50%] mx-auto">
                {/* File upload drag area placeholder (a large box) */}
                <SkeletonLoader className="h-40 w-full relative flex flex-col items-center justify-center m-2 p-6 border-2 border-dashed border-brand rounded-lg cursor-pointer transition-all ease-in-out" />
            </div>

        </div>
    );
};

export default UploadSkeleton;
