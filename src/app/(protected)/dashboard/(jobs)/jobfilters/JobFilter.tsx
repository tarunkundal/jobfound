"use client"
import { FormRow } from "@/app/(protected)/onboarding/_components/OnboardingForm";
import MultiSelect from "@/theme/ui/components/multiSelect";
import { cn } from "@/theme/ui/utils/cn";
import { GetUserType } from "@/types/user";
import { useState } from "react";

const JobFilter = ({ userData }: { userData: GetUserType }) => {
    const userName = userData.fullName != null && userData?.fullName != "" && userData?.fullName != 'Unknown' ? userData.fullName : userData?.email
    const [jobType, setJobType] = useState<string[]>([])
    const jobTypes = [
        {
            label: "Full Time",
            value: "full_time"
        },

        {
            label: "Part Time",
            value: "part_time"
        },
        {
            label: "Contract",
            value: "contract"
        },
        {
            label: "Freelance",
            value: "freelance"
        },
        {
            label: "Internship",
            value: "internship"
        },
    ]
    return (
        <div className="flex flex-col gap-4 bg-card rounded-card p-4 w-[95%] mx-auto shadow-card border-card">
            <h1 className="text-2xl font-semibold text-brand-foreground">Welcome, {userName}</h1>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-secondary">Job Type</h2>
                <div className="flex flex-col gap-2">
                    <FormRow>
                        <MultiSelect
                            placeholder="Select Job Type"
                            options={jobTypes}
                            value={jobType}
                            onChange={(value) => {
                                setJobType(value);
                            }}
                            className={cn(
                                "border-destructive"
                            )} />
                    </FormRow>
                </div>
            </div>
        </div>
    )
}

export default JobFilter