import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

const isAuthed = t.middleware(async ({ ctx, next }) => {
    if (!ctx.user) throw new Error("UNAUTHORIZED");

    const userId = ctx.user.id;

    // Ensure profile exists
    await ctx.prisma.profile.upsert({
        where: { userId: userId },
        update: {},
        create: { userId: userId },
    });
    // Ensure resume exists
    await ctx.prisma.resume.upsert({
        where: { userId: userId },
        update: {},
        create: {
            userId: userId,
        },
    });

    return next({ ctx: { user: ctx.user } })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const protectedProcedure = t.procedure.use(isAuthed);

