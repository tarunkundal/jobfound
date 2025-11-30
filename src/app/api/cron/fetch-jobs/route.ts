import { NextResponse } from "next/server";
import { fetchJobsFormPlatformsAndSaveTODB } from "@/server/jobs/fetchJobsFormPlatformsAndSaveTODB";

export async function GET() {
    // runs in 12hours 
    try {
        const result = await fetchJobsFormPlatformsAndSaveTODB({ page: 1, limit: 2 });
        return NextResponse.json({ success: true, total: result });
    } catch (err: any) {
        console.error("Cron job failed:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
