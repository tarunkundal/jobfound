
import { getUserResumeVector } from '@/lib/resume/helpers/getUserResumeVector';
import { MatchedJobInterface } from '@/types/jobs';
import { Context } from '../trpc/context';

export async function matchJobsByAi(ctx: Context) {
    // user id whose resume we are matching jobs for
    const userId = ctx.user?.id
    // 1. Get user's resume vector embeddings
    const userVector = await getUserResumeVector(ctx);
    console.log("User embedding:", userVector);

    if (!userVector || userVector.length === 0) {
        console.warn("User has no resume embeddings. Cannot match jobs.");
        return [];
    }

    // Prepare the vector string literal for raw SQL injection (as we did for inserts)
    const vectorString = '[' + userVector.map((n: any) => Number(n).toString()).join(',') + ']';

    // 2. Use raw SQL to find matching jobs efficiently, returning the score
    // The query calculates the score on the fly during the matching process
    const potentialMatches: MatchedJobInterface[] = await ctx.prisma.$queryRaw`
        SELECT 
            id,
            source,
            title,
            company,
            "companyUrl",
            location,
            url,
            salary,
            description,
            "postedAt",
            "workType",
            "externalId",
            -- Calculate score: 1 - distance = similarity (0 to 1)
            (1 - ("description_vector" <=> ${vectorString}::vector))::float AS match_score 
        FROM "jobs"
        WHERE "postedAt" >= NOW() - INTERVAL '5 days' -- Look at recent jobs
        AND NOT EXISTS (
            SELECT 1 FROM "applications" a WHERE a."jobId" = "jobs".id AND a."userId" = ${userId}::uuid
        )
        ORDER BY match_score DESC
        LIMIT 50; -- Limit results for performance
    `;

    // console.log('potentials matches', potentialMatches);

    // 3. Filter for high-confidence scores (e.g., 80% or higher)
    const MINIMUM_SCORE_THRESHOLD = 0.35;
    const highPriorityJobs = potentialMatches.filter(job => job.match_score >= MINIMUM_SCORE_THRESHOLD);
    // generate cover letters for each high priority job
    await Promise.all(highPriorityJobs.map(async (job) => {
        // generate cover letter
        // const coverLetter = await generateCoverLetter({ context: ctx, job });
        // attach cover letter to job object
        job.coverLetter = 'coverLetter';
    }));

    // send email to user with high priority jobs
    // const response = await sendMatchEmail(ctx.user?.email!, highPriorityJobs);
    console.log('high priorities jobs are', highPriorityJobs);

    return highPriorityJobs;
}
