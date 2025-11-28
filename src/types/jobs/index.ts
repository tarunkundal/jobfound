
export interface FetchJobInterface {
    source: "linkedin" | "jooble" | "remotive"
    title: string;
    company: string;
    companyUrl: string | null;
    location: string;
    url: string;
    salary: string | null;
    description: string;
    postedAt: string;
    workType: string;
    externalId?: string;
}

export interface MatchedJobInterface {
    id: string;
    title: string;
    company: string;
    url: string;
    match_score: number;
    description: string;
    source: string;
    companyUrl: string | null;
    location: string | null;
    salary: string | null;
    postedAt: Date;
    workType: string | null;
    externalId: string | null;
    coverLetter?: string
}

