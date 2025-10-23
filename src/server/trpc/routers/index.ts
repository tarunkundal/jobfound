import { router } from '../trpc';
import { jobRouter } from './user';

export const appRouter = router({
    job: jobRouter,
});

export type AppRouter = typeof appRouter;
