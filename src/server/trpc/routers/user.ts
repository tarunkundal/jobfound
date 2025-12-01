import { prisma } from '@/db';
import { GetUserType } from '@/types/user';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const userRouter = router({
    getUser: protectedProcedure.query(async ({ ctx }): Promise<GetUserType | null> => {
        const userId = ctx.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { isOnboarded: true, email: true, fullName: true, id: true, enableAiCoverLetter: true, enableDailyJobMatchesEmail: true, filterAiMatchedJobs: true }
        });

        return user;
    }),
    updateUserOnboarded: protectedProcedure.input(z.object({ onboarded: z.boolean() })).mutation(async ({ ctx, input }): Promise<GetUserType | null> => {
        const userId = ctx.user.id;
        const data = await ctx.prisma.user.update({
            where: { id: userId },
            data: { isOnboarded: input.onboarded },
            select: { isOnboarded: true, email: true, fullName: true, id: true }
        });
        return data;
    }),
    enableDisableAiCoverLetter: protectedProcedure.input(z.object({ enableAiCoverLetter: z.boolean() })).mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        const data = await ctx.prisma.user.update({
            where: { id: userId },
            data: { enableAiCoverLetter: input.enableAiCoverLetter },
            select: { enableAiCoverLetter: true }
        });
        return data;
    }),
    enableDisableDailyJobMatchesEmail: protectedProcedure.input(z.object({ enableDailyJobMatchesEmail: z.boolean() })).mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        const data = await ctx.prisma.user.update({
            where: { id: userId },
            data: { enableDailyJobMatchesEmail: input.enableDailyJobMatchesEmail },
            select: { enableDailyJobMatchesEmail: true }
        });
        return data;
    }),
    filterAiMatchedJobs: protectedProcedure.input(z.object({ filterAiMatchedJobs: z.boolean() })).mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        const data = await ctx.prisma.user.update({
            where: { id: userId },
            data: { filterAiMatchedJobs: input.filterAiMatchedJobs },
            select: { filterAiMatchedJobs: true }
        });
        return data;
    })

});
