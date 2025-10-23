import { prisma } from "@/db";

export async function createContext() {
    return {
        prisma,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
