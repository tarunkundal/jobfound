import { FetchJobResult } from "@/types/jobs";
import { isWithin24Hours } from "./helpers";

export async function fetchFromJooble(role: string, location: string): Promise<FetchJobResult> {
    const API_KEY = process.env.JOOBLE_API_KEY!;

    try {
        const res = await fetch(`https://jooble.org/api/${API_KEY}`, {
            method: "POST",
            body: JSON.stringify({ keywords: role, location }),
        });

        const data = await res.json();


        if (!data.jobs) {
            return {
                success: false,
                provider: "jooble",
                message: "No job field in response",
            };
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
        return {
            success: false,
            provider: "jooble",
            message: err.message || "Jooble API error",
        };
    }
}
