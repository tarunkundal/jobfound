export const runtime = 'nodejs';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/trpc/routers';
import { createContext } from '@/server/trpc/context';

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext,
        onError({ error }) {
            console.error("tRPC Error:", error);
            return {}
        },
    });

export { handler as GET, handler as POST };
