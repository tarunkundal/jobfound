import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '@/db';

export const jobRouter = router({
    create: publicProcedure
        .input(
            z.object({
                title: z.string(),
                company: z.string(),
                description: z.string(),
                url: z.string().url(),
            }),
        )
        .mutation(async ({ input }) => {
            return prisma.job.create({ data: input });
        }),

    list: publicProcedure.query(() => prisma.job.findMany()),

    get: publicProcedure
        .input(z.string())
        .query(({ input }) => prisma.job.findUnique({ where: { id: input } })),

    delete: publicProcedure
        .input(z.string())
        .mutation(({ input }) => prisma.job.delete({ where: { id: input } })),
});
