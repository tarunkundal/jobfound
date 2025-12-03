import { prisma } from '@/db';
import { Job, Profile } from '@/generated/prisma';
import { generateCoverLetter } from '@/server/ai/generateCoverLetter';
import { matchJobsByAi } from '@/server/ai/matchJobsByAi';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const jobsRouter = router({
    getAllJobs: protectedProcedure.query(async ({ ctx }) => {
        // get user profile
        const profile: Profile = await prisma.profile.findUnique({
            where: { userId: ctx.user.id },
        });

        if (!profile) return [];

        // build filters dynamically
        const filters: any = {};

        // if (profile.jobTitles?.length) filters.title = { in: profile.jobTitles, mode: "insensitive" };
        // if (profile.workPreference?.length) filters.workType = { in: profile.workPreference, mode: "insensitive" };
        // if (profile.skills?.length) filters.skills = { in: profile.skills };
        if (profile.preferredJobLocation?.length) filters.location = { in: [profile.preferredJobLocation], mode: "insensitive" };

        console.log('filters are', filters)

        // Used to just fetch & return jobs from db Job table with the filters
        const jobs: Job[] = await prisma.job.findMany({
            orderBy: { postedAt: 'desc' },
            take: 50,
            where: filters,
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
