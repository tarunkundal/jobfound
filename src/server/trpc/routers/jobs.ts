import { matchJobsByAi } from '@/server/ai/matchJobsByAi';
import { protectedProcedure, router } from '../trpc';

export const jobsRouter = router({
    getAllJobs: protectedProcedure.query(async ({ ctx }) => {
        // const userData = await ctx.prisma.user.findUnique({ where: { id: ctx.user.id } });
        // if (!userData) {
        //     throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
        // }

        // Used to insert jobs into DB after fetching from providers
        // const jobs = await fetchJobsForUser({ user: userData, ctx });

        // Used to just fetch & return jobs from db Job table
        // const jobs: Job[] = await ctx.prisma.job.findMany({
        //     orderBy: { postedAt: 'desc' },
        //     take: 50,
        // });
        // return jobs

        // This returns a list of jobs that are high priority (>= 80% match)
        const matches = await matchJobsByAi(ctx);
        return matches;

    }),
    getAutoApplyMatches: protectedProcedure.query(async ({ ctx }) => {
        // This runs the AI matching logic
        const matches = await matchJobsByAi(ctx);

        // This returns a list of jobs that are high priority (>= 80% match)
        return matches;
    }),
});
