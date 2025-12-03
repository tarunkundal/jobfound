import UploadSkeleton from './UploadSkeleton'
import OnboardingFormSkeleton from './OnboardingFormSkeleton'

const OnboardingContainerSkeleton = () => {
    return (
        <div className="flex flex-col">
            <UploadSkeleton />
            <OnboardingFormSkeleton />
        </div>
    )
}

export default OnboardingContainerSkeleton