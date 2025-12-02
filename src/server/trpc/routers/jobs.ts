import { matchJobsByAi } from '@/server/ai/matchJobsByAi';
import { protectedProcedure, router } from '../trpc';
import { Job } from '@/generated/prisma';
import { generateCoverLetter } from '@/server/ai/generateCoverLetter';
import { z } from 'zod';
import { prisma } from '@/db';
import { TRPCError } from '@trpc/server';

export const jobsRouter = router({
    getAllJobs: protectedProcedure.query(async ({ ctx }) => {
        // Used to just fetch & return jobs from db Job table
        const jobs: Job[] = await ctx.prisma.job.findMany({
            orderBy: { postedAt: 'desc' },
            take: 50,
        });
        return jobs || []
    }),
    // This runs the AI matching logic
    getJobsWithAIScore: protectedProcedure.query(async ({ ctx }) => {
        const matchedJobs = await matchJobsByAi({ id: ctx.user.id, email: ctx.user.email! });
        return matchedJobs;
    }),
    getAiCoverLetterForJob: protectedProcedure.input(z.object({ selectedJobId: z.string() })).query(async ({ ctx, input }) => {
        const selectedJob = await prisma.job.findFirst({
            where: { id: input.selectedJobId },
        });
        if (!selectedJob) throw new TRPCError({ code: "NOT_FOUND" });
        const coverLetter = await generateCoverLetter({ userId: ctx.user.id, job: selectedJob })
        return coverLetter
    })
});
