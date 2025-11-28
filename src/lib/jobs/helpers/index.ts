export function cleanJobDescription(raw: string = "") {
    if (!raw) return "";

    let text = raw;

    // 1️⃣ Convert common HTML block tags to newlines
    text = text
        .replace(/<\/div>/gi, "\n")
        .replace(/<\/p>/gi, "\n")
        .replace(/<br\s*\/?>/gi, "\n");

    // 2️⃣ Remove all remaining HTML tags: <b>, <span>, <div style="">
    text = text.replace(/<[^>]*>/g, "");

    // 3️⃣ Replace HTML entities
    text = text
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

    // 4️⃣ Normalize newlines & whitespaces
    text = text
        .replace(/\r\n|\r/g, "\n")
        .replace(/\n\s*\n\s*\n/g, "\n\n")
        .replace(/\s+/g, " ");

    // 5️⃣ Fix bullets from Jooble (# → •)
    text = text.replace(/#\s*/g, "• ");

    // 6️⃣ Remove leading/trailing spaces
    return text.trim();
}

export function isWithin24Hours(dateStr: string) {
    const posted = new Date(dateStr).getTime();
    if (Number.isNaN(posted)) return false;
    const now = Date.now();
    const diff = now - posted;
    const ONE_DAY_MS = 2 * 24 * 60 * 60 * 1000;
    return diff <= ONE_DAY_MS;
}

export function removeDuplicates(jobs: any[]) {
    const map = new Map();
    jobs.forEach((job) => {
        const key = `${job.title}-${job.company}-${job.location}`
        if (!map.has(key)) map.set(key, job);
    });
    return Array.from(map.values());
}

export function sortByDate(jobs: any[]) {
    return jobs.sort(
        (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    );
}
export function paginate(jobs: any[], page = 1, limit = 20) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
        total: jobs.length,
        page,
        limit,
        results: jobs.slice(start, end)
    };
}