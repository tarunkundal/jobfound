import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7, 'To short password').max(32, 'To long password'),
})