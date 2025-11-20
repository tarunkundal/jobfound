import { router } from '../trpc';
import { jobsRouter } from './jobs';
import { resumeRouter } from './resume';
import { uploadRouter } from './upload';
import { userRouter } from './user';
import { userProfileRouter } from './userProfile';

export const appRouter = router({
    user: userRouter,
    upload: uploadRouter,
    resume: resumeRouter,
    jobs: jobsRouter,
    userProfile: userProfileRouter,
});

export type AppRouter = typeof appRouter;
