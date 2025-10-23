import * as PrismaClientPkg from '@prisma/client';

const PrismaClient = (PrismaClientPkg as any).PrismaClient ?? (PrismaClientPkg as any).default;

const globalForPrisma = globalThis as unknown as { prisma: any };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL, // uses the env variable here
            },
        },
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
