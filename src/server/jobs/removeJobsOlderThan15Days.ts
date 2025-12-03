import { prisma } from "@/db";

export async function removeJobsOlderThan15Days() {
    const cutoffDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

    const result = await prisma.job.deleteMany({
        where: {
            postedAt: { lt: cutoffDate }
        }
    });

    console.log(`Deleted ${result.count} old jobs`);
}
