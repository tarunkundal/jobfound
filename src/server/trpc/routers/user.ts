import { prisma } from '@/db';
import { protectedProcedure, router } from '../trpc';
import z from 'zod';
import { userFormSchema } from '@/schema/user.schema';

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

    getUserFormData: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.user.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        return user;
    }),

    updateUserForm: protectedProcedure.input(userFormSchema.partial()).mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        return ctx.prisma.user.update({
            where: { id: userId },
            data: input,
        });
    })

});
