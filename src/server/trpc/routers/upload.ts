import { folderEnum, getFileUrlSchema } from "@/schema/upload.schema";
import { columnMap } from "@/utils";
import { protectedProcedure, router } from "../trpc";


export const uploadRouter = router({
    updateUserFile: protectedProcedure
        .input(getFileUrlSchema)
        .mutation(async ({ ctx, input }) => {
            const { folder, filePath } = input;
            const userId = ctx.user.id;
            const supabase = ctx.supabase
            const pathToBeUpdated = columnMap[folder];

            let table: "resume" | "profile";

            if (folder === "resumes") table = "resume";
            else if (folder === "photos") table = "profile";
            else throw new Error("Unsupported folder type");

            const oldRecord = await ctx.prisma[table].findUnique({
                where: { userId: userId },
                select: {
                    [pathToBeUpdated]: true,
                },
            });

            const oldFilePath = oldRecord?.[pathToBeUpdated];

            if (oldFilePath) {
                await supabase.storage.from(folder).remove([oldFilePath]);
            }

            await ctx.prisma[table].update({
                where: { userId: userId },
                data: {
                    [pathToBeUpdated]: filePath ?? ""
                }
            });

            return {
                success: true, filePath
            };
        }),

    getUploadedFilePath: protectedProcedure
        .input(folderEnum)
        .query(async ({ ctx, input }) => {
            const folder = input;
            const userId = ctx.user.id;
            const supabase = ctx.supabase;

            const column = columnMap[folder];
            if (!column) throw new Error("Invalid folder type");

            const table = folder === "resumes" ? "resume" : "profile";

            const record = await ctx.prisma[table].findUnique({
                where: { userId: userId },
                select: { [column]: true }
            });

            const filePath = record?.[column];
            if (!filePath) return { signedFileUrl: null };

            const { data, error } = await supabase.storage
                .from(folder)
                .createSignedUrl(filePath, 3600);

            if (error) return { signedFileUrl: null };

            return { signedFileUrl: data.signedUrl };
        }),



});
