import { fetchJobsForUser } from '@/lib/jobs/fetchJobsForUser';
import { TRPCError } from '@trpc/server';
import { protectedProcedure, router } from '../trpc';

export const jobsRouter = router({
    getAllJobs: protectedProcedure.query(async ({ ctx }) => {
        const userData = await ctx.prisma.user.findUnique({ where: { id: ctx.user.id } });
        if (!userData) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
        }

        // fetchJobsForUser will throw a TRPCError when providers all fail.
        const jobs = await fetchJobsForUser({ user: userData });
        return jobs;
    })
});
