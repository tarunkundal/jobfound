// import { userFormSchema } from "@/schema/user.schema";
// import z from "zod";
// import { fetchFromJooble } from "./fetchFromJooble";
// import { fetchFromRemotive } from "./fetchFromRemotive";
// import { normalizeJob } from "./normalizeJob";
// import { fetchFromLinkedIn } from "./fetchFromLinkedIn";
// import { removeDuplicates, sortByDate } from "./helpers";
// import { FetchJobError } from "@/types/jobs";

// interface UserSchema {
//     user: z.infer<typeof userFormSchema>
//     page?: number
//     limit?: number
// }

// export async function fetchJobsForUser({ user, page = 1, limit = 20, }: UserSchema) {
//     const role = user.jobTitles[0] || "software engineer";
//     const location = user.preferredJobLocation || user.residenceCountry || "Remote";

//     const [remotiveRes, linkedInRes, joobleRes] = await Promise.all([
//         fetchFromRemotive(role, location),
//         fetchFromLinkedIn(role, location),
//         fetchFromJooble(role, location)
//     ]);
//     const errors: FetchJobError[] = [];

//     const remotiveJobs = Array.isArray(remotiveRes)
//         ? remotiveRes
//         : (errors.push(remotiveRes), []);

//     const linkedinJobs = Array.isArray(linkedInRes)
//         ? linkedInRes
//         : (errors.push(linkedInRes), []);

//     const joobleJobs = Array.isArray(joobleRes)
//         ? joobleRes
//         : (errors.push(joobleRes), []);
//     let allJobs = [...(Array.isArray(remotiveJobs) ? remotiveJobs : []), ...linkedinJobs, ...(Array.isArray(joobleJobs) ? joobleJobs : [])];

//     // Normalize
//     allJobs = allJobs.map(normalizeJob);

//     // Remove duplicates
//     allJobs = removeDuplicates(allJobs);

//     // Sort by newest first
//     allJobs = sortByDate(allJobs);


//     // Paginate
//     // return {
//     //     success: true,
//     //     errors,
//     //     data: paginate(allJobs, page, limit),
//     // };
//     return allJobs
// }
import { userFormSchema } from "@/schema/user.schema";
import { TRPCError } from '@trpc/server';
import z from "zod";
import { fetchFromJooble } from "./fetchFromJooble";
import { fetchFromLinkedIn } from "./fetchFromLinkedIn";
import { fetchFromRemotive } from "./fetchFromRemotive";
import { removeDuplicates, sortByDate } from "./helpers";
import { normalizeJob } from "./normalizeJob";

interface UserSchema {
    user: z.infer<typeof userFormSchema>
    page?: number
    limit?: number
}

export async function fetchJobsForUser({ user, page = 1, limit = 20, }: UserSchema) {
    const role = user.jobTitles?.[0] || "software engineer";
    const location = user.preferredJobLocation || user.residenceCountry || "Remote";

    const results = await Promise.allSettled([
        fetchFromRemotive(role, location),
        fetchFromLinkedIn(role, location),
        fetchFromJooble(role, location),
    ]);
    console.log('all jobs results', results);


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

    return paginated;
}
