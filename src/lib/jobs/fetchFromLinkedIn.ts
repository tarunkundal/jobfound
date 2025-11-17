import { ApifyClient } from "apify-client";
import { isWithin24Hours } from "./helpers";
import { FetchJobInterface } from "@/types/jobs";

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

export async function fetchFromLinkedIn(role: string, location: string): Promise<FetchJobInterface[] | []> {
    const run = await client.actor("apimaestro/linkedin-jobs-scraper-api").call({
        keywords: `${role}`,
        location: location,
        useApifyProxy: true,
        maxItems: 30,
        sort: "recent",
        limit: 10
    });
    try {

    } catch (error) {

    }
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    return items
        .filter((job: any) => isWithin24Hours(job.postedAt))
        .map((job: any) => ({
            source: "linkedin",
            title: job.job_title,
            company: job.company,
            companyUrl: job.company_url || null,
            location: job.location,
            url: job.job_url,
            salary: job.salary || null,
            description: job.description || "",
            postedAt: job.postedAt,
            workType: job.workplace_type || "Unknown",
        }));
}

