import { storeJobsToDb } from "@/server/jobs/storeJobsToDb";
import { TRPCError } from '@trpc/server';
import { fetchFromJooble } from "./fetchFromJooble";
import { fetchFromRemotive } from "./fetchFromRemotive";
import { removeDuplicates, sortByDate } from "./jobHelpers";
import { normalizeJob } from "./normalizeJob";

interface PageProps {
    page?: number
    limit?: number
}
// Fetch jobs form resources and normalize, dedupe, and store new jobs to DB
export async function fetchJobsFormPlatformsAndSaveTODB({ page = 1, limit = 2 }: PageProps) {
    const role = "software engineer";
    const location = "Remote";

    const results = await Promise.allSettled([
        fetchFromRemotive(role, location),
        // fetchFromLinkedIn(role, location),
        fetchFromJooble(role, location),
    ]);

    const providers = ["remotive", "linkedin", "jooble"];
    const collectedJobs: any[] = [];
    const providerErrors: { provider: string; message: string }[] = [];

    for (let i = 0; i < results.length; i++) {
        const res = results[i];
        const provider = providers[i];
        if (res.status === 'fulfilled') {
            const value: any = (res as any).value;
            if (Array.isArray(value)) {
                collectedJobs.push(...value);
            } else {
                providerErrors.push({ provider, message: (value && (value.message || String(value))) || 'Unknown provider error' });
                console.warn(`Provider ${provider} returned non-array result`, value);
            }
        } else {
            const err: any = (res as any).reason;
            providerErrors.push({ provider, message: err?.message || String(err) });
            console.error(`Provider ${provider} failed`, err);
        }
    }

    // If no provider returned jobs, throw so centralized tRPC error handling runs
    if (collectedJobs.length === 0) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch jobs from all providers', cause: providerErrors });
    }

    // Normalize, dedupe and sort
    let allJobs = collectedJobs.map(normalizeJob);
    allJobs = removeDuplicates(allJobs);
    allJobs = sortByDate(allJobs);

    // Paginate
    const start = (page - 1) * limit;
    const paginated = allJobs.slice(start, start + limit);

    const newJobsToInsert = await storeJobsToDb(paginated)

    return newJobsToInsert;
}
