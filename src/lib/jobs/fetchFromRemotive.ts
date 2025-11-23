import { FetchJobInterface } from "@/types/jobs";

export async function fetchFromRemotive(role: string, location: string): Promise<FetchJobInterface[]> {
    const categoryMap: Record<string, string> = {
        "software engineer": "software-dev",
        "frontend engineer": "software-dev",
        "fullstack developer": "software-dev",
        "marketing": "marketing",
        "sales": "sales-business-dev",
    };
    const category = categoryMap[role.toLowerCase()] || "software-dev";

    const url = `https://remotive.com/api/remote-jobs?category=${category}&search=${encodeURIComponent(location)}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`remotive: unexpected status ${res.status} ${text}`);
        }

        const data = await res.json();

        if (!data?.jobs || !Array.isArray(data.jobs)) {
            throw new Error('remotive: no jobs array in response');
        }
        console.log('remotive data jobs', data.jobs);

        return data.jobs
            // .filter((job: any) => isWithin24Hours(job.publication_date))
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
        throw err instanceof Error ? err : new Error('remotive: unknown error');
    }
}
