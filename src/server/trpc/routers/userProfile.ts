import { protectedProcedure, router } from '../trpc';
import { userFormSchema } from '@/schema/user.schema';

export const userProfileRouter = router({
    getUserProfileData: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.user.id;
        const user = await ctx.prisma.profile.findUnique({
            where: { userId },
        });
        return user;
    }),

    updateUserProfile: protectedProcedure.input(userFormSchema.partial()).mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        return await ctx.prisma.profile.update({
            where: { userId },
            data: input,
        });
    })

});
