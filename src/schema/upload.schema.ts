import { z } from "zod";

export const folderEnum = z.enum(["resumes", "photos"]);

export const uploadFileSchema = z.object({
    fileName: z.string(),
    fileType: z.string(),
    folder: folderEnum,
});

export const getFileUrlSchema = z.object({
    filePath: z.string(),
    folder: folderEnum,
    publicUrl: z.string(),
});

export const updateUserFileSchema = z.object({
    folder: folderEnum,
    filePath: z.string(),
});

export type UploadFileInput = z.infer<typeof uploadFileSchema>;
export type GetFileUrlInput = z.infer<typeof getFileUrlSchema>;
export type UpdateUserFileInput = z.infer<typeof updateUserFileSchema>;
