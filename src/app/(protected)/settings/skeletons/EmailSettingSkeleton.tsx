import React from 'react';
import SkeletonLoader from '../../onboarding/_skeletons/SkeletionLoader';

const EmailSettingsSkeleton: React.FC = () => {

    const SkeletonRow = () => (
        <div className="flex justify-between items-center py-2">
            <div className="flex flex-col gap-2 w-3/4">
                <SkeletonLoader className="h-5 w-48" /> {/* Title placeholder */}
                <SkeletonLoader className="h-4 w-full" />
            </div>
            <SkeletonLoader className="h-6 w-10 rounded-full" />
        </div>
    );

    return (
        <div className="flex flex-col gap-4">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
        </div>
    );
};

export default EmailSettingsSkeleton;
