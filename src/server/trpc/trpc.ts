import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

const t = initTRPC.context<Context>().create({
    transformer: superjson, // better serialization for dates etc.
    errorFormatter({ shape }) {
        return shape;
    },
});

const isAuthed = t.middleware(async ({ ctx, next }) => {
    if (!ctx.user) throw new Error("UNAUTHORIZED");

    const userId = ctx.user.id;

    // Ensure profile exists
    const existingUserProfile = await ctx.prisma.profile.findFirst({ where: { userId } });
    if (!existingUserProfile) {
        await ctx.prisma.profile.create({ data: { userId } });

    }
    // Ensure resume exists
    // Use a safe existence check and create if missing.
    const existingResume = await ctx.prisma.resume.findFirst({ where: { userId } });
    if (!existingResume) {
        await ctx.prisma.resume.create({ data: { userId } });
    }

    return next({ ctx: { user: ctx.user } })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const protectedProcedure = t.procedure.use(isAuthed);

