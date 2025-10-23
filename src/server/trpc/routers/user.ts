import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '@/db';

export const userRouter = router({

    list: publicProcedure.query(async () => {
        const users = await prisma.user.findMany()
        console.log('users', users);
        return users;

    }),

    get: publicProcedure
        .input(z.string())
        .query(({ input }) => prisma.user.findUnique({ where: { id: input } })),

    delete: publicProcedure
        .input(z.string())
        .mutation(({ input }) => prisma.user.delete({ where: { id: input } })),
});
