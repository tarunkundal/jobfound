export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { fetchJobsFormPlatformsAndSaveTODB } from "@/server/jobs/fetchJobsFormPlatformsAndSaveTODB";
import { removeJobsOlderThan15Days } from "@/server/jobs/removeJobsOlderThan15Days";

export async function GET() {
    try {
        const now = new Date();
        const hourUTC = now.getUTCHours();

        console.log("⏱ Cron running at UTC hour:", hourUTC);
        let result;

        // morning at 6
        if (hourUTC === 6) {
            console.log("🚀 Running job fetch");
            result = await fetchJobsFormPlatformsAndSaveTODB({ page: 1, limit: 2 });
        }
        //  Once per day (00:00 UTC)
        if (hourUTC === 0) {
            console.log("🧹 Running cleanup");
            await removeJobsOlderThan15Days();
        }
        return NextResponse.json({ success: true, total: result });
    } catch (err: any) {
        console.error("Cron job failed:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// We have one more function to remove the jobs which are 15 days older as of free plan we use only 2 cron jobs
// export async function GET() {
//     // runs once in 24hours 
//     try {
//         const result = await removeJobsOlderThan15Days();
//         return NextResponse.json({ success: true, total: result });
//     } catch (err: any) {
//         console.error("Cron job failed:", err);
//         return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//     }
// }
