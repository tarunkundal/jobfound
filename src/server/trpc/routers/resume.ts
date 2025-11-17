import { parseResumeFromSupabase } from "@/server/ai/parseResume";
import { getFileRelativePath } from "@/utils";
import { protectedProcedure, router } from "../trpc";

export const resumeRouter = router({
    parsedResume: protectedProcedure
        .mutation(async ({ ctx }) => {
            try {
                const user = await ctx.prisma.user.findUnique({
                    where: { id: ctx.user.id },
                    select: { resume_url: true },
                });

                const fileUrl = user['resume_url'];
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
                const parsed = await parseResumeFromSupabase(signedUrlData?.signedUrl);

                return { parsedData: parsed };
            } catch (error) {
                console.error("parsedData failed:", error);
                return { parsedData: null };
            }
        }),

});
