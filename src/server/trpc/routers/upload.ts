import { getFileUrlSchema } from "@/schema/upload.schema";
import { protectedProcedure, router } from "../trpc";

export const uploadRouter = router({
    updateUserFile: protectedProcedure
        .input(getFileUrlSchema)
        .mutation(async ({ ctx, input }) => {
            const { folder, filePath, publicUrl } = input;
            const userId = ctx.user.id;

            if (!publicUrl) throw new Error("Failed to get public URL");

            // 2️⃣ Fetch old user record
            const user = await ctx.prisma.user.findUnique({
                where: { id: userId },
                select: { resume_url: true, photo_url: true },
            });
            console.log(user, ctx)
            // 3️⃣ Determine which field to update
            const oldUrl = folder === "resumes" ? user?.resume_url : user?.photo_url;

            // 4️⃣ Delete old file if it exists
            if (oldUrl) {
                try {
                    const oldPath = oldUrl.split("/storage/v1/object/public/")[1];
                    if (oldPath) {
                        await ctx.supabase.storage.from(folder).remove([oldPath]);
                    }
                } catch (e) {
                    console.error("Error deleting old file:", e);
                }
            }

            // 5️⃣ Update user record with new URL
            await ctx.prisma.user.update({
                where: { id: userId },
                data:
                    folder === "resumes"
                        ? { resume_url: publicUrl }
                        : { photo_url: publicUrl },
            });

            return { success: true, publicUrl };
        }),
});
