import { folderEnum, getFileUrlSchema } from "@/schema/upload.schema";
import { protectedProcedure, router } from "../trpc";
import { columnMap } from "@/utils";

export const uploadRouter = router({
    updateUserFile: protectedProcedure
        .input(getFileUrlSchema)
        .mutation(async ({ ctx, input }) => {
            const { folder, filePath } = input;
            const userId = ctx.user.id;

            //  Determine which field to update
            const pathToBeUpdated = columnMap[folder];

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

    getUserFilePath: protectedProcedure.input(folderEnum).query(async ({ ctx, input }) => {
        try {
            if (!ctx.user) throw new Error("User not authenticated");
            const column = columnMap[input];

            if (!column) throw new Error("Invalid folder");
            const user = await ctx.prisma.user.findUnique({
                where: { id: ctx.user.id },
                select: { [column]: true }
            })
            if (!user) {
                throw new Error("User not found");
            }

            return { filePath: user[column] };
        } catch (error) {
            console.log('erroridjf', error);
        }
    })
});
