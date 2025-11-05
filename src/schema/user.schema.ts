import { z } from "zod";

export const userFormSchema = z.object({
    // 🧍‍♂️ Basic Info
    fullName: z.string().min(2, "Full name is required"),

    // 🧠 Job & Career
    jobTitles: z
        .array(z.string().min(1, "Invalid job title"))
        .min(1, "Please select at least one job title")
        .max(3, "You can select up to 3 job titles only"),
    currentEmployer: z
        .string()
        .optional(),
    educationLevel: z
        .string({ error: "Please select your eductation level" })
        .min(1, "Please select your eductation level")
        .optional(),
    experienceYears: z
        .string({ error: "Please select your years of experience", })
        .min(1, "Please select your years of experience"),
    experienceLevel: z
        .string({ error: "Please select your experience level" })
        .min(1, "Please select your experience level"),
    workPreference: z
        .array(z.string())
        .min(1, "Please select at least one work preference"),

    // 🌍 Location
    residenceCountry: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),

    // 📞 Contact Info
    email: z.string().email("Enter a valid email"),
    phoneNumber: z
        .string()
        .min(10, "Enter a valid phone number")
        .max(15, "Phone number is too long")
        .regex(/^[+\d\s()-]+$/, "Enter a valid phone number"),

    // 💼 Professional Links
    linkedinUrl: z
        .string()
        .url("Enter a valid LinkedIn URL")
        .optional()
        .or(z.literal("")), // allows empty field if not mandatory

    // 💰 Salary
    minimumSalary: z.coerce.number().optional(),

    // 📝 Additional Info
    additionalContext: z
        .string()
        .max(500, "Context too long")
        .optional()
        .or(z.literal("")), // optional text

    // 📄 Resume
    resume_url: z.string().url("Invalid file URL"),


    // ⚧ Gender
    gender: z.enum(["male", "female"], {
        message: "Please select your gender",
    }),
    photo_url: z.string().optional().or(z.literal("")),

    // ✅ Terms
    terms: z
        .boolean()
        .refine((val) => val === true, { message: "You must accept the terms" }),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;
