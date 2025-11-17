import { FetchJobResult } from "@/types/jobs";
import { isWithin24Hours } from "./helpers";

export async function fetchFromRemotive(role: string, location: string): Promise<FetchJobResult> {
    const categoryMap: Record<string, string> = {
        "software engineer": "software-dev",
        "frontend engineer": "software-dev",
        "fullstack developer": "software-dev",
        "marketing": "marketing",
        "sales": "sales-business-dev",
    };
    const category = categoryMap[role.toLowerCase()] || "software-dev";

    const url = `https://remotive.com/api/remote-jobs?category=${category}&search=${location}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        return data.jobs
            .filter((job: any) => isWithin24Hours(job.publication_date))
            .map((job: any) => ({
                source: "remotive",
                title: job.title,
                company: job.company_name,
                companyUrl: job.url || null,
                location: job.candidate_required_location,
                url: job.url,
                salary: job.salary || null,
                description: job.description,
                postedAt: job.publication_date,
                workType: "Remote",
            }));
    } catch (err: any) {
        console.error("Error fetching from Remotive:", err);
        return {
            success: false,
            provider: "remotive",
            message: err.message || "Remotive API error",
        };
    }
}
