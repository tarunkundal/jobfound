import { FormRow } from "../_components/OnboardingForm";
import SkeletonLoader from "./SkeletionLoader";

const OnboardingFormSkeleton = () => (
    <div className="w-[90%] bg-primary my-[2%] mx-auto border-card rounded-card relative">
        <div className={`mx-auto px-6 py-6 flex flex-col gap-6 `}>
            <div>
                <h2 className="text-brand-foreground text-2xl font-semibold">Set up Your Profile</h2>
                <p className="text-secondary">{"This is the last time you'll need to enter this information! Our AI agent will use it to apply to hundreds of jobs for you!"}</p>
            </div>
            {/* Skeleton Email field area */}
            <div className="flex flex-col gap-1 w-[90%] md:w-[50%] lg:w-[50%]">
                <SkeletonLoader className="h-4 w-16 mb-2" /> {/* Label */}
                <SkeletonLoader className="h-10 w-full" /> {/* Input field */}
                <SkeletonLoader className="h-3 w-48 mt-1" /> {/* Helper text */}
            </div>

            <SkeletonLoader className="h-6 w-56 mt-6" /> {/* Required Information title */}

            {/* Skeleton Form Fields Grid */}
            <div className="flex flex-col gap-6 md:flex-row lg:flex-row md:flex-wrap">
                {/* Repeat this structure for each row of the form */}
                <FormRow>
                    <SkeletonLoader className="h-4 w-20 mb-2" /> {/* Label */}
                    <SkeletonLoader className="h-10 w-full" /> {/* Input */}
                </FormRow>
                <FormRow>
                    <SkeletonLoader className="h-4 w-32 mb-2" /> {/* Label */}
                    <SkeletonLoader className="h-10 w-full" /> {/* Select */}
                </FormRow>
                <FormRow>
                    <SkeletonLoader className="h-4 w-32 mb-2" /> {/* Label */}
                    <SkeletonLoader className="h-10 w-full" /> {/* Select */}
                </FormRow>
                <FormRow>
                    <SkeletonLoader className="h-4 w-32 mb-2" /> {/* Label */}
                    <SkeletonLoader className="h-10 w-full" /> {/* MultiSelect */}
                </FormRow>
                <FormRow>
                    <SkeletonLoader className="h-4 w-32 mb-2" /> {/* Label */}
                    <SkeletonLoader className="h-10 w-full" /> {/* MultiSelect */}
                </FormRow>
                <FormRow>
                    <SkeletonLoader className="h-4 w-32 mb-2" /> {/* Label */}
                    <SkeletonLoader className="h-10 w-full" /> {/* MultiSelect */}
                </FormRow>
                <FormRow>
                    <SkeletonLoader className="h-4 w-32 mb-2" /> {/* Label */}
                    <SkeletonLoader className="h-10 w-full" /> {/* MultiSelect */}
                </FormRow>
                <FormRow>
                    <SkeletonLoader className="h-4 w-32 mb-2" /> {/* Label */}
                    <SkeletonLoader className="h-10 w-full" /> {/* MultiSelect */}
                </FormRow>
                <FormRow>
                    <SkeletonLoader className="h-4 w-32 mb-2" /> {/* Label */}
                    <SkeletonLoader className="h-10 w-full" /> {/* MultiSelect */}
                </FormRow>
                <FormRow>
                    <SkeletonLoader className="h-4 w-32 mb-2" /> {/* Label */}
                    <SkeletonLoader className="h-10 w-full" /> {/* MultiSelect */}
                </FormRow>
                {/* Add more rows as needed to match your layout */}

                {/* Skeleton Button */}
                <div className="w-full flex justify-end mt-4">
                    <SkeletonLoader className="h-10 w-full" />
                </div>
            </div>
        </div>
    </div>
);

export default OnboardingFormSkeleton