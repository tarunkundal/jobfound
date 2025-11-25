
import { getUserResumeVector } from '@/utils/helpers/getUserResumeVector';
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
    const potentialMatches: {
        id: string;
        title: string;
        company: string;
        url: string;
        match_score: number;
        description: string;
        source: string;
        companyUrl: string | null;
        location: string | null;
        salary: string | null;
        postedAt: Date;
        workType: string | null;
        externalId: string | null;
    }[] = await ctx.prisma.$queryRaw`
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
        WHERE "postedAt" >= NOW() - INTERVAL '3 days' -- Look at recent jobs
        AND NOT EXISTS (
            SELECT 1 FROM "applications" a WHERE a."jobId" = "jobs".id AND a."userId" = ${userId}::uuid
        )
        ORDER BY match_score DESC
        LIMIT 50; -- Limit results for performance
    `;

    console.log('potentials matches', potentialMatches);


    // 3. Filter for high-confidence scores (e.g., 80% or higher)
    const MINIMUM_SCORE_THRESHOLD = 0.001;
    const highPriorityJobs = potentialMatches.filter(job => job.match_score >= MINIMUM_SCORE_THRESHOLD);

    return highPriorityJobs;
}
