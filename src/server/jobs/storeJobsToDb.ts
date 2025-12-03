import { prisma } from "@/db";
import { generateEmbeddingsForDocs } from "@/server/ai/createOpenAIEmbeddings";
import { FetchJobInterface } from "@/types/jobs";

// save jobs to db with the description_vector field and added the logic to avoid duplicates based on externalId and source
export const storeJobsToDb = async (jobs: FetchJobInterface[]) => {

    if (jobs.length === 0) { console.log("No jobs to process."); return; }

    const validJobs = jobs.filter(job => job.externalId !== undefined && job.externalId !== null) as Required<FetchJobInterface>[];
    if (validJobs.length === 0) { console.log("No jobs with external IDs found for processing."); return; }

    try {
        const existingJobIds = await prisma.job.findMany({
            where: { externalId: { in: validJobs.map(j => String(j.externalId)) } },
            select: { externalId: true }
        });
        const existingIdsSet = new Set(existingJobIds.map((j: { externalId: string; }) => String(j.externalId)));
        const newJobsToInsert = validJobs.filter(job => !existingIdsSet.has(String(job.externalId)));

        if (newJobsToInsert.length === 0) {
            console.log("All jobs already exist. Skipping embeddings and insertion.");
            return;
        }

        console.log(`Generating embeddings for ${newJobsToInsert.length} NEW jobs...`);
        const descriptions = newJobsToInsert.map(job => job.description);
        const vectors = await generateEmbeddingsForDocs(descriptions);
        console.log("Embeddings generated.");

        const jobsWithVectors = newJobsToInsert.map((item, index) => ({
            ...item,
            postedAt: new Date(item.postedAt).toISOString(),
            vectorString: '[' + vectors[index].map((n) => Number(n).toString()).join(',') + ']'
        }));

        // 🛑 BATCHING LOGIC WITH PARAMETERIZED QUERY (FIXED) 🛑
        const BATCH_SIZE = 10;
        let affectedRows = 0;
        // 11 fields + vector string = 12 columns in the SQL
        const totalColumns = 12;

        for (let i = 0; i < jobsWithVectors.length; i += BATCH_SIZE) {
            const batch = jobsWithVectors.slice(i, i + BATCH_SIZE);
            const flatParams: (string | Date | null)[] = [];

            // Build the VALUES clause using $N placeholders for all values
            const valuesClause = batch.map((item, j) => {
                // Calculate the starting index for this specific row in the flatParams array
                const startIndex = (i + j) * totalColumns;

                // Add parameters to the flatParams array in the correct order
                flatParams.push(
                    String(item.externalId), item.source, item.title, item.company, item.companyUrl,
                    item.location, item.url, item.salary, item.description, item.vectorString, item.postedAt, item.workType
                );

                // Return the SQL string for this row using the correct indices and explicit casting
                return `(
                    gen_random_uuid(), 
                    $${startIndex + 1}, $${startIndex + 2}, $${startIndex + 3}, $${startIndex + 4}, $${startIndex + 5}, 
                    $${startIndex + 6}, $${startIndex + 7}, $${startIndex + 8}, $${startIndex + 9}, $${startIndex + 10}::vector, 
                    $${startIndex + 11}::timestamp, NOW(), NOW() -- createdAt and updatedAt added here
                )`;
            }).join(', ');


            const insertQuery = `
                INSERT INTO "jobs" (
                    "id", "externalId", "source", "title", "company", "companyUrl", "location", 
                    "url", "salary", "description", "description_vector", "postedAt", 
                    "createdAt", "updatedAt"
                ) VALUES ${valuesClause}
                ON CONFLICT ("externalId") DO NOTHING;
            `;

            // Execute the batch insert
            const result = await prisma.$executeRawUnsafe(insertQuery, ...flatParams);
            affectedRows += result;
        }

        console.log(`Bulk insert finished. Total rows inserted/affected: ${affectedRows}. Jobs processed in total: ${jobs.length}.`);

    } catch (error) {
        console.error("Error inserting jobs into Supabase via raw SQL:", error);
        throw new Error("Failed to store jobs in the database.");
    }
}
