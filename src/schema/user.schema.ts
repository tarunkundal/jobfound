import { z } from "zod";

export const userFormSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    jobTitles: z
        .array(z.string().min(1, "Invalid job title"))
        .min(1, "Please select at least one job title")
        .max(3, "You can select up to 3 job titles only"),
    currentEmployer: z.string().optional().or(z.literal("")),
    educationLevel: z
        .string({ error: "Please select your education level" })
        .default(""),
    experienceYears: z
        .string({ error: "Please select your years of experience" })
        .min(1, "Please select your years of experience"),
    experienceLevel: z
        .string({ error: "Please select your experience level" })
        .min(1, "Please select your experience level"),
    workPreference: z
        .array(z.string())
        .min(1, "Please select at least one work preference"),
    skills: z
        .array(z.string())
        .min(1, "Please add at least one skill")
        .describe(
            "Skills in which user is proficient, such as React.js, JavaScript, Node, etc."
        ),

    // 📍 Location & Contact
    residenceCountry: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    phoneNumber: z
        .string()
        .min(10, "Enter a valid phone number")
        .max(15, "Phone number is too long")
        .regex(/^[+\d\s()-]+$/, "Enter a valid phone number"),
    linkedinUrl: z
        .string()
        .url("Enter a valid LinkedIn URL")
        .optional()
        .or(z.literal("")),

    // 💰 Compensation & Extra
    preferredJobLocation: z.string().optional().or(z.literal("")),
    minimumSalary: z.string().optional(),
    additionalContext: z
        .string()
        .max(500, "Context too long")
        .optional()
        .or(z.literal("")),

    // ⚥ Misc
    gender: z.enum(["male", "female"], {
        message: "Please select your gender",
    }).default("male"),
    photo_url: z.string().optional().or(z.literal("")),

    // ✅ Terms
    terms: z
        .boolean()
        .refine((val) => val === true, { message: "You must accept the terms" }),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;
