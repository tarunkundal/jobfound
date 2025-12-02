
import { prisma } from '@/db';
import { getUserResumeVector } from '@/server/resumes/getUserResumeVector';
import { MatchedJobInterface } from '@/types/jobs';

interface MatchJobsByAiProps {
    id: string
    email: string
}

export async function matchJobsByAi(user: MatchJobsByAiProps) {
    // user id whose resume we are matching jobs for
    const userId = user.id
    const userEmail = user.email
    // 1. Get user's resume vector embeddings
    const userVector = await getUserResumeVector(userId!);
    console.log("User embedding:", userVector);

    if (!userVector || userVector.length === 0) {
        console.warn("User has no resume. Cannot match jobs.");
        return [];
    }

    // Prepare the vector string literal for raw SQL injection (as we did for inserts)
    const vectorString = '[' + userVector.map((n: any) => Number(n).toString()).join(',') + ']';

    // 2. Use raw SQL to find matching jobs efficiently, returning the score
    const potentialJobsWithAIScores: MatchedJobInterface[] = await prisma.$queryRaw`
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
            "createdAt",
            "updatedAt",
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
    console.log('potentials matches', potentialJobsWithAIScores);

    // 3. Filter for high-confidence scores (e.g., 80% or higher)
    const MINIMUM_SCORE_THRESHOLD = 0.003;
    const highPriorityJobs = potentialJobsWithAIScores.filter(job => job.match_score >= MINIMUM_SCORE_THRESHOLD);

    console.log('high priorities jobs are', highPriorityJobs);

    return highPriorityJobs;
}
