import { folderEnum, getFileUrlSchema } from "@/schema/upload.schema";
import { protectedProcedure, router } from "../trpc";
import { columnMap } from "@/utils";

export const uploadRouter = router({
    updateUserFile: protectedProcedure
        .input(getFileUrlSchema)
        .mutation(async ({ ctx, input }) => {
            const { folder, filePath } = input;
            const userId = ctx.user.id;
            const supabase = ctx.supabase
            //  Determine which field to update resume_url/photo_url
            const pathToBeUpdated = columnMap[folder];

            // 1️⃣ Fetch old path
            const user = await ctx.prisma.user.findUnique({
                where: { id: userId },
                select: { [pathToBeUpdated]: true },
            });

            const oldFilePath = user?.[pathToBeUpdated];
            // 2️⃣ Delete old file from storage (if exists)
            if (oldFilePath) {
                const { error: deleteError } = await supabase
                    .storage
                    .from(folder)
                    .remove([oldFilePath]);
                if (deleteError) console.warn("Delete old file failed:", deleteError);
            }

            // Update user record with new URL
            await ctx.prisma.user.update({
                where: { id: userId },
                data: {
                    [pathToBeUpdated]: filePath ?? ''
                }
            });
            return {
                success: true, filePath, message: filePath
                    ? "File path updated successfully."
                    : "File removed successfully.",
            };
        }),

    getUserFilePath: protectedProcedure
        .input(folderEnum)
        .query(async ({ ctx, input }) => {
            try {
                if (!ctx.user) throw new Error("User not authenticated");

                const column = columnMap[input];
                if (!column) throw new Error("Invalid folder name");

                const user = await ctx.prisma.user.findUnique({
                    where: { id: ctx.user.id },
                    select: { [column]: true },
                });

                if (!user) throw new Error("User not found");

                const filePath = user[column];
                if (!filePath) {
                    // No file uploaded yet
                    return { signedFileUrl: null };
                }

                const { data: signedUrlData, error: signedUrlError } =
                    await ctx.supabase.storage
                        .from(input)
                        .createSignedUrl(filePath, 3600);

                if (signedUrlError || !signedUrlData?.signedUrl) {
                    console.warn("Failed to create signed URL:", signedUrlError);
                    return { signedFileUrl: null };
                }

                return { signedFileUrl: signedUrlData.signedUrl };
            } catch (error) {
                console.error("getUserFilePath failed:", error);
                return { signedFileUrl: null };
            }
        }),

});
