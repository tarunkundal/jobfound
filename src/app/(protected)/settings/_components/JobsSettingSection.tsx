import { Suspense } from "react"
import EmailSettingsSkeleton from "../skeletons/EmailSettingSkeleton"
import EmailSettings from "./EmailSettings"

const JobsSettingSection = () => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <p className="text-xl font-semibold text-brand-foreground">Jobs & Recommendations</p>
                <p className="text-secondary text-sm">Configure AI-based job matching, notifications, and cover-letter features.</p>
            </div>
            <Suspense fallback={<EmailSettingsSkeleton />}>
                <EmailSettings />
            </Suspense>
        </div>
    )
}

export default JobsSettingSection