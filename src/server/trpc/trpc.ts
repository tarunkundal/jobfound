import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

const t = initTRPC.context<Context>().create({
    transformer: superjson, // better serialization for dates etc.
    errorFormatter({ shape }) {
        return shape;
    },
});

const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.user) throw new Error('UNAUTHORIZED')
    return next({ ctx: { user: ctx.user } })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const protectedProcedure = t.procedure.use(isAuthed);

