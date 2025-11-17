import { fetchJobsForUser } from '@/lib/jobs/fetchJobsForUser';
import { protectedProcedure, router } from '../trpc';

export const jobsRouter = router({
    fetchAllJobs: protectedProcedure.mutation(async ({ ctx }) => {
        try {
            const userData = await ctx.prisma.user.findUnique({
                where: { id: ctx.user.id }
            });

            const response = await fetchJobsForUser({ user: userData });

            return response;

        } catch (error: any) {
            console.log("error while fetching jobs", error);
            return {
                success: false,
                message: error.message || "TRPC route error",
                data: [],
                errors: []
            };
        }
    })
});
