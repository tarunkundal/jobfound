import { prisma } from '@/db';
import { protectedProcedure, router } from '../trpc';
import z from 'zod';

export const userRouter = router({
    createUserIfNotExists: protectedProcedure
        .input(
            z.object({
                email: z.string().email(),
                fullName: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { email, fullName } = input;
            const userId = ctx.user.id; // comes from Supabase session

            // Check if exists
            const existing = await ctx.prisma.user.findUnique({
                where: { id: userId },
            });

            if (existing) return existing;

            // Create new user
            const newUser = await ctx.prisma.user.create({
                data: {
                    id: userId,
                    email,
                    fullName: fullName ?? "",
                    termsAccepted: false,
                },
            });

            return newUser;
        }),
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
