import { prisma } from "@/db";

export async function getUserResumeVector(userId: string) {
    if (!userId) return null;

    // Cast vector → text because Prisma cannot deserialize pgvector
    const rows: Array<{ resume_embeddings: string | null }> = await prisma.$queryRaw`
        SELECT resume_embeddings::text AS resume_embeddings
        FROM "Resume"
        WHERE "userId" = ${userId}::uuid
        LIMIT 1;
    `;

    if (!rows || !rows[0] || !rows[0].resume_embeddings) {
        return null;
    }

    const embeddingString = rows[0].resume_embeddings;

    // Convert "[1,2,3]" → [1,2,3]
    try {
        const parsed = JSON.parse(embeddingString);
        if (Array.isArray(parsed)) {
            return parsed.map(Number);
        }
        return null;
    } catch (err) {
        console.error("Failed to parse embedding string:", err);
        return null;
    }
}
