import { prisma } from "@/db";
import { sendMatchingJobsEmailCoverletterWithAiScore } from "@/server/ai/sendMatchingJobsEmailCoverletter";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // 1️⃣ Load all users who uploaded a resume
        const users = await prisma.user.findMany({
            where: {
                resumes: {
                    raw_extracted_text: {
                        not: null,
                    }
                }
            },
            select: {
                id: true,
                email: true,
            }
        });

        const results: any[] = [];
        //  Loop all users
        for (const user of users) {
            const response = await sendMatchingJobsEmailCoverletterWithAiScore({ id: user.id, email: user.email });
            results.push({ 'Users Email': response })
        }

        return NextResponse.json({ success: true, message: "Jobs are being sent successfully on emails!", data: results });
    } catch (err) {
        console.error("Cron error:", err);
        return NextResponse.json({ error: "Cron failed" }, { status: 500 });
    }
}
