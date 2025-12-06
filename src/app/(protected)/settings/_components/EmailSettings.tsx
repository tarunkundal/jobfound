"use client";
import useCustomToast from "@/hooks/useCustomToast";
import { Switch } from "@/theme/ui/components/switch";
import { GetUserType } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { UseMutationResult } from "@tanstack/react-query";
type UserMutationResult = UseMutationResult<any, any, any, any>;

const EmailSettings = () => {
    const utils = trpc.useUtils()
    const toast = useCustomToast()

    const { data: userData } = trpc.user.getUser.useQuery(undefined, { staleTime: Infinity });

    const toggleAiCoverLetter = trpc.user.enableDisableAiCoverLetter.useMutation();
    const toggleDailyEmail = trpc.user.enableDisableDailyJobMatchesEmail.useMutation();
    const toggleFilterAiJobs = trpc.user.filterAiMatchedJobs.useMutation();

    //  Generic reusable handler with Optimistic Updates
    const handleToggle = (
        mutation: UserMutationResult,
        payloadKey: keyof GetUserType, // Ensures payloadKey matches a key in your user data
        newValue: boolean
    ) => {
        // Prevent action while a request is already pending for this specific mutation
        if (mutation.isPending) return;

        // --- Optimistic Update Logic ---

        // 1. Snapshot the current data before we mutate
        const previousUserData = utils.user.getUser.getData();

        // 2. Optimistically update the cache immediately
        // We use setQueryData to manually update the local cache
        utils.user.getUser.setData(undefined, (oldData) => {
            if (!oldData) return previousUserData; // Safety check

            // Return the new object with the toggled value
            return {
                ...oldData,
                [payloadKey]: newValue,
            };
        });

        // 3. Call the mutation
        mutation.mutate(
            { [payloadKey]: newValue },
            {
                onSuccess: () => {
                    toast({ title: "Updated Successfully!", status: "success" });
                },
                onError: (err: any) => {
                    //  If the mutation fails, revert the cache back to the snapshot
                    utils.user.getUser.setData(undefined, previousUserData);
                    toast({
                        title: "Failed to update",
                        description: `Reverted to previous state. ${err.message}`,
                        status: "error"
                    });
                },
                onSettled: () => {
                    // Ensure the background fetch occurs eventually to sync with server state
                    utils.user.getUser.invalidate();
                }
            }
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-brand-foreground">Smart Job Match Emails</p>
                    <p className="text-secondary text-sm">AI-selected opportunities sent to your inbox every morning.</p>
                </div>
                <Switch
                    checked={userData?.enableDailyJobMatchesEmail}
                    disabled={toggleDailyEmail.isPending}
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
                    disabled={toggleAiCoverLetter.isPending}
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
                    disabled={toggleFilterAiJobs.isPending}
                    onCheckedChange={(state) =>
                        handleToggle(toggleFilterAiJobs, "filterAiMatchedJobs", state)
                    }
                />
            </div>
        </div>
    )
}

export default EmailSettings