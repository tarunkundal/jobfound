import { router } from '../trpc';
import { uploadRouter } from './upload';
import { userRouter } from './user';

export const appRouter = router({
    user: userRouter,
    upload: uploadRouter,
});

export type AppRouter = typeof appRouter;
