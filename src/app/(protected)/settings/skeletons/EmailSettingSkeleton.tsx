import React from 'react';
import SkeletonLoader from '../../onboarding/_skeletons/SkeletionLoader';

const EmailSettingsSkeleton: React.FC = () => {

    // Helper component to structure each loading row
    const SkeletonRow = () => (
        <div className="flex justify-between items-center py-2">
            {/* Left side: Title and description placeholders */}
            <div className="flex flex-col gap-2 w-3/4">
                <SkeletonLoader className="h-5 w-48" /> {/* Title placeholder */}
                <SkeletonLoader className="h-4 w-full" /> {/* Description placeholder */}
            </div>

            {/* Right side: Switch placeholder (mimics common switch size) */}
            <SkeletonLoader className="h-6 w-10 rounded-full" />
        </div>
    );

    return (
        <div className="flex flex-col gap-4">
            {/* Repeat the skeleton row for each setting item */}
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
        </div>
    );
};

export default EmailSettingsSkeleton;
