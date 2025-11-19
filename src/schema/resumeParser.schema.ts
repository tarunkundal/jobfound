import { z } from "zod";

export const resumeSchema = z.object({
    fullName: z
        .string()
        .default("")
        .optional()
        .describe("The candidate's full name as written in the resume."),
    jobTitles: z
        .array(z.string())
        .default([])
        .optional()
        .describe("A list of job titles the candidate has held or mentioned."),
    currentEmployer: z
        .string()
        .default("")
        .optional()
        .describe("The company where the candidate is currently employed."),
    educationLevel: z
        .string()
        .default("")
        .optional()
        .describe("The highest education degree achieved by the candidate."),
    experienceYears: z
        .string()
        .default("")
        .optional()
        .describe("Total number of years of work experience."),
    experienceLevel: z
        .string()
        .default("")
        .optional()
        .describe("Seniority level, e.g., Junior, Mid-level, or Senior."),
    workPreference: z
        .array(z.string())
        .default([])
        .optional()
        .describe("Preferred working arrangement, such as Remote, On-site, or Hybrid."),
    residenceCountry: z
        .string()
        .default("")
        .optional()
        .describe("Country of residence or location of the candidate."),
    state: z
        .string()
        .default("")
        .optional()
        .describe("State or region of residence."),
    city: z
        .string()
        .default("")
        .optional()
        .describe("City where the candidate is based."),
    email: z
        .string()
        .default("")
        .optional()
        .describe("Email address of the candidate."),
    phoneNumber: z
        .string()
        .default("")
        .optional()
        .describe("Primary contact phone number."),
    linkedinUrl: z
        .string()
        .default("")
        .optional()
        .describe("LinkedIn profile URL."),
    additionalContext: z
        .string()
        .default("")
        .optional()
        .describe("Any extra relevant context or details found in the resume."),
    photo_url: z
        .string()
        .default("")
        .optional()
        .describe("URL of the candidate’s profile photo, if available."),
    skills: z
        .array(z.string())
        .default([])
        .optional()
        .describe("Skills in which user is prefect, such as React.js, JavaScript, Node, etc."),
    summary: z
        .string()
        .default("")
        .optional()
        .describe("A short professional summary or objective extracted from the resume."),
});
