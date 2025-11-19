import { parseResumeFromSupabase } from "@/server/ai/parseResume";
import { getFileRelativePath } from "@/utils";
import { protectedProcedure, router } from "../trpc";

export const resumeRouter = router({
    parseResume: protectedProcedure
        .mutation(async ({ ctx }) => {
            try {
                const userResumeData = await ctx.prisma.resume.findFirst({
                    where: { userId: ctx.user.id },
                    select: { resume_url: true },
                });

                const fileUrl = userResumeData['resume_url'];
                const relativeFilePath = fileUrl ? getFileRelativePath(fileUrl, "resumes") : null;
                if (!relativeFilePath) {
                    return { parsedData: null };
                }

                const { data: signedUrlData, error: signedUrlError } =
                    await ctx.supabase.storage
                        .from("resumes")
                        .createSignedUrl(relativeFilePath, 3600);

                if (signedUrlError || !signedUrlData?.signedUrl) {
                    console.warn("Failed to create signed URL:", signedUrlError);
                    return { parsedData: null };
                }
                const parsed = await parseResumeFromSupabase(signedUrlData?.signedUrl, ctx);

                return { parsedData: parsed };
            } catch (error) {
                console.error("parsedData failed:", error);
                return { parsedData: null };
            }
        }),
    getResumeIfExists: protectedProcedure
        .query(async ({ ctx }) => {
            const userId = ctx.user.id;
            const resumeRecord = await ctx.prisma.resume.findUnique({
                where: { userId },
                select: { id: true, resume_url: true, },
            });

            return { resume: resumeRecord || null };
        }),
})