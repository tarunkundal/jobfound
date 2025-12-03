export type GetUserType = {
    id: string;
    email: string;
    fullName: string | null;
    isOnboarded: boolean;
    enableAiCoverLetter: boolean
    enableDailyJobMatchesEmail: boolean
    filterAiMatchedJobs: boolean
};
