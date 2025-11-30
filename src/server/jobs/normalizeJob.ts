import { FetchJobInterface } from "@/types/jobs";
import { cleanJobDescription } from "./jobHelpers";

export function normalizeJob(job: FetchJobInterface) {
    return {
        title: job.title,
        company: job.company,
        location: job.location,
        workType: job.workType || "Unknown",
        companyUrl: job.companyUrl,
        description: cleanJobDescription(job.description),
        url: job.url,
        postedAt: job.postedAt,
        source: job.source,
        salary: job.salary,
        externalId: job.externalId,
    };
}
