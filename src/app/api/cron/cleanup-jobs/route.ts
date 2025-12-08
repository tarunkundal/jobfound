export const runtime = 'nodejs';
import { removeJobsOlderThan15Days } from "@/server/jobs/removeJobsOlderThan15Days";
import { NextResponse } from "next/server";

export async function GET() {
    // runs once in 24hours 
    try {
        const result = await removeJobsOlderThan15Days();
        return NextResponse.json({ success: true, total: result });
    } catch (err: any) {
        console.error("Cron job failed:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
