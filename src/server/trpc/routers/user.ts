import { prisma } from '@/db';
import { protectedProcedure, router } from '../trpc';
import { GetUserType } from '@/types/user';
import { z } from 'zod';

export const userRouter = router({
    getUser: protectedProcedure.query(async ({ ctx }): Promise<GetUserType | null> => {
        const userId = ctx.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { isOnboarded: true, email: true, fullName: true, id: true }
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
    })

});
