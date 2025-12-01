"use client";
import useCustomToast from "@/hooks/useCustomToast";
import { Switch } from "@/theme/ui/components/switch";
import { trpc } from "@/utils/trpc";

const EmailSettings = () => {
    const utils = trpc.useUtils()
    const toast = useCustomToast()

    const toggleAiCoverLetter = trpc.user.enableDisableAiCoverLetter.useMutation();
    const toggleDailyEmail = trpc.user.enableDisableDailyJobMatchesEmail.useMutation();
    const toggleFilterAiJobs = trpc.user.filterAiMatchedJobs.useMutation();

    // Generic reusable handler
    const handleToggle = (mutation: any, payloadKey: string, value: boolean) => {
        mutation.mutate(
            { [payloadKey]: value },
            {
                onSuccess: () => {
                    utils.user.getUser.invalidate();
                    toast({ title: "Updated Successfully!", status: "success" });
                }
            }
        );
    };

    const { data: userData, isLoading: isUserLoading } = trpc.user.getUser.useQuery(undefined, { staleTime: Infinity });
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-brand-foreground">Smart Job Match Emails</p>
                    <p className="text-secondary text-sm">AI-selected opportunities sent to your inbox every morning.</p>
                </div>
                <Switch
                    checked={userData?.enableDailyJobMatchesEmail}
                    disabled={toggleDailyEmail.isPending || isUserLoading}
                    onCheckedChange={(state) =>
                        handleToggle(toggleDailyEmail, "enableDailyJobMatchesEmail", state)
                    }
                />

            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-brand-foreground">AI Cover Letter Generator</p>
                    <p className="text-secondary text-sm">Enable creating personalized cover letters for individual jobs with one click.</p>
                </div>
                <Switch
                    checked={userData?.enableAiCoverLetter}
                    disabled={toggleAiCoverLetter.isPending || isUserLoading}
                    onCheckedChange={(state) =>
                        handleToggle(toggleAiCoverLetter, "enableAiCoverLetter", state)
                    }
                />
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-brand-foreground">Show AI-Matched Jobs Only</p>
                    <p className="text-secondary text-sm">Filter job results to display only strong matches identified by AI.</p>
                </div>
                <Switch
                    checked={userData?.filterAiMatchedJobs}
                    disabled={toggleFilterAiJobs.isPending || isUserLoading}
                    onCheckedChange={(state) =>
                        handleToggle(toggleFilterAiJobs, "filterAiMatchedJobs", state)
                    }
                />
            </div>
        </div>
    )
}

export default EmailSettings