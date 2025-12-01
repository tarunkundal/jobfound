import { prisma } from "@/db";
import { matchJobsByAi } from "@/server/ai/matchJobsByAi";
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

        //  Loop all users
        for (const user of users) {
            await matchJobsByAi({ id: user.id, email: user.email });
        }

        return NextResponse.json({ success: true, message: "Jobs are being sent successfully on email!" });
    } catch (err) {
        console.error("Cron error:", err);
        return NextResponse.json({ error: "Cron failed" }, { status: 500 });
    }
}
