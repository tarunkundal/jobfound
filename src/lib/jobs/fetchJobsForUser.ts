import { userFormSchema } from "@/schema/user.schema";
import z from "zod";
import { fetchFromJooble } from "./fetchFromJooble";
import { fetchFromRemotive } from "./fetchFromRemotive";
import { normalizeJob } from "./normalizeJob";
import { fetchFromLinkedIn } from "./fetchFromLinkedIn";
import { removeDuplicates, sortByDate } from "./helpers";
import { FetchJobError } from "@/types/jobs";

interface UserSchema {
    user: z.infer<typeof userFormSchema>
    page?: number
    limit?: number
}

export async function fetchJobsForUser({ user, page = 1, limit = 20, }: UserSchema) {
    const role = user.jobTitles[0] || "software engineer";
    const location = user.residenceCountry || "India";

    const [remotiveRes, linkedInRes, joobleRes] = await Promise.all([
        fetchFromRemotive(role, location),
        fetchFromLinkedIn(role, location),
        fetchFromJooble(role, location)
    ]);
    const errors: FetchJobError[] = [];

    const remotiveJobs = Array.isArray(remotiveRes)
        ? remotiveRes
        : (errors.push(remotiveRes), []);

    const linkedinJobs = Array.isArray(linkedInRes)
        ? linkedInRes
        : (errors.push(linkedInRes), []);

    const joobleJobs = Array.isArray(joobleRes)
        ? joobleRes
        : (errors.push(joobleRes), []);
    let allJobs = [...(Array.isArray(remotiveJobs) ? remotiveJobs : []), ...linkedinJobs, ...(Array.isArray(joobleJobs) ? joobleJobs : [])];

    // Normalize
    allJobs = allJobs.map(normalizeJob);

    // Remove duplicates
    allJobs = removeDuplicates(allJobs);

    // Sort by newest first
    allJobs = sortByDate(allJobs);


    // Paginate
    // return {
    //     success: true,
    //     errors,
    //     data: paginate(allJobs, page, limit),
    // };
    return allJobs
}
