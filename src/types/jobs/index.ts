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


export type FetchJobResult = FetchJobInterface[];