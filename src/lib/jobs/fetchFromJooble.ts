import { FetchJobInterface } from "@/types/jobs";
import { isWithin24Hours } from "./helpers";

export async function fetchFromJooble(role: string, location: string): Promise<FetchJobInterface[]> {
    const API_KEY = process.env.JOOBLE_API_KEY;
    if (!API_KEY) throw new Error('jooble: missing API key');

    try {
        const res = await fetch(`https://jooble.org/api/${API_KEY}`, {
            method: "POST",
            body: JSON.stringify({ keywords: role, location }),
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`jooble: unexpected status ${res.status} ${text}`);
        }

        const data = await res.json();

        if (!data?.jobs || !Array.isArray(data.jobs)) {
            throw new Error('jooble: no jobs array in response');
        }
        return data.jobs
            .filter((job: any) => isWithin24Hours(job.updated))
            .map((job: any) => ({
                source: "jooble",
                title: job.title,
                company: job.company,
                companyUrl: null,
                location: job.location,
                url: job.link,
                salary: job.salary || null,
                description: job.snippet,
                postedAt: job.updated,
                workType: job.type || "Unknown",
            }));
    } catch (err: any) {
        console.error("Error fetching from Jooble:", err);
        throw err instanceof Error ? err : new Error('jooble: unknown error');
    }
}
