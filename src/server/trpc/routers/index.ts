import { router } from '../trpc';
import { resumeRouter } from './resume';
import { uploadRouter } from './upload';
import { userRouter } from './user';

export const appRouter = router({
    user: userRouter,
    upload: uploadRouter,
    resume: resumeRouter
});

export type AppRouter = typeof appRouter;
