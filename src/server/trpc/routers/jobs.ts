import { prisma } from '@/db';
import { Job } from '@/generated/prisma';
import { generateCoverLetter } from '@/server/ai/generateCoverLetter';
import { matchJobsByAi } from '@/server/ai/matchJobsByAi';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
interface JobCursor {
    createdAt: string;
    id: string;
}
const cursorSchema = z.object({
    createdAt: z.string().datetime(),
    id: z.string().uuid(),
}).nullish();

export const jobsRouter = router({
    getAllJobs: protectedProcedure.input(
        z.object({
            limit: z.number().min(1).max(100).nullish(),
            cursor: cursorSchema,
        }),
    ).query(async ({ ctx, input }) => {
        const limit = input.limit ?? 20;
        const cursor = input.cursor
        // get user profile
        // const profile: Profile = await prisma.profile.findUnique({
        //     where: { userId: ctx.user.id },
        // });
        // if (!profile) return [];
        // build filters dynamically
        // const filters: any = {};
        // if (profile.jobTitles?.length) filters.title = { in: profile.jobTitles, mode: "insensitive" };
        // if (profile.workPreference?.length) filters.workType = { in: profile.workPreference, mode: "insensitive" };
        // if (profile.skills?.length) filters.skills = { in: profile.skills };
        // if (profile.preferredJobLocation?.length) filters.location = { in: [profile.preferredJobLocation], mode: "insensitive" };

        // Used to just fetch & return jobs from db Job table with the filters
        const jobs: Job[] = await prisma.job.findMany({
            take: limit + 1,
            ...(cursor && {
                cursor: {
                    createdAt_id: {
                        createdAt: new Date(cursor.createdAt),
                        id: cursor.id,
                    },
                    // id: cursor.id
                },
                skip: 1,
            }),
            orderBy: [
                // { createdAt: 'desc' },
                { id: 'desc' },
            ],

        });
        let nextCursor: JobCursor | undefined = undefined;
        if (jobs.length > limit) {
            const nextItem = jobs.pop();
            nextCursor = {
                createdAt: nextItem!.createdAt.toISOString(),
                id: nextItem!.id,
            };
        }
        return {
            jobs,
            nextCursor,
        };
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
