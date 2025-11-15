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
}
export interface FetchJobError {
    success: false;
    provider: string;
    message: string;
}

export type FetchJobResult = FetchJobInterface[] | FetchJobError;