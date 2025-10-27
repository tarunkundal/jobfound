import { prisma } from '@/db';
import { protectedProcedure, router } from '../trpc';

export const userRouter = router({
    me: protectedProcedure.query(({ ctx }) => ctx.user),

    list: protectedProcedure.query(async () => {
        try {
            const users = await prisma.user.findMany();
            console.log('users', users);
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // keeps tRPC 500 but logs full stack
        }
    }),

    // get: publicProcedure
    //     .input(z.string())
    //     .query(({ input }) => prisma.user.findUnique({ where: { id: input } })),

    // delete: publicProcedure
    //     .input(z.string())
    //     .mutation(({ input }) => prisma.user.delete({ where: { id: input } })),
});
