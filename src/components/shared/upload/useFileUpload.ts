import { useUser } from "@/app/(auth)/_hooks/useUser";
import useCustomToast from "@/hooks/useCustomToast";
import { createClient } from "@/lib/supabseClient";
import { useFileUploadProps } from "@/types/Upload";
import { filePathConstructor, getFileExtension } from "@/utils";
import { trpc } from "@/utils/trpc";
import { useState } from 'react';

export function useFileUpload({ folder, maxSizeMB, onChange, multiple, files }: useFileUploadProps) {
    const supabase = createClient();
    const utils = trpc.useUtils();
    const { user } = useUser();
    const toast = useCustomToast();
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const { mutateAsync: updateUserFile } = trpc.upload.updateUserFile.useMutation({
        onSuccess: async () => {
            await utils.upload.getUserFilePath.invalidate(folder); // ✅ cache invalidation
            if (folder === 'resumes') {
                // Invalidate the cache so the query knows to fetch fresh data
                await utils.resume.parsedResume.invalidate();

                // refetch the data immediately
                await utils.resume.parsedResume.refetch();
            }
        },
    });

    const userId = user?.id;
    const validateFileSize = (file: File) => {
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB!) {
            toast({
                title: `File "${file.name}" exceeds the ${maxSizeMB}MB limit`,
                status: "error",
            });
            return false;
        }
        return true;
    };

    const uploadFile = async (file: File) => {
        if (!validateFileSize(file)) return;
        if (!userId) throw new Error("User not authenticated");
        const extension = getFileExtension(file)
        const uniqueFileName = `${filePathConstructor[folder]}_${Date.now()}.${extension}`;
        const filePath = `${userId}/${uniqueFileName}`
        try {
            setIsUploading(true)
            const { error: uploadError } = await supabase.storage.from(folder).upload(filePath, file, { upsert: false, });
            if (uploadError) throw uploadError;

            const { success } = await updateUserFile({ folder: folder, filePath: filePath });
            if (!success || uploadError) { throw new Error("Upload or DB update failed"); }

            onChange?.(multiple ? [...<[]>files, file] : [file]);
            toast({ title: "Upload successful!", status: "success" });
        } catch (error: any) {
            toast({
                title: "Upload failed!",
                description: error.message,
                status: "error",
            });
            console.error("Upload error:", error);
        } finally { setIsUploading(false) }
    };

    const removeFile = async (file: File) => {
        if (!userId) throw new Error("User not authenticated");
        try {
            setIsUploading(true)
            const { success } = await updateUserFile({ folder: folder, filePath: '' });
            if (!success) throw new Error("DB update failed");
            onChange?.((files ?? []).filter(f => f !== file));
            toast({ title: "File removed successful!", status: "success" });
        } catch (error: any) {
            toast({
                title: "Remove failed!",
                description: error.message,
                status: "error",
            });
            console.error("Remove error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return { uploadFile, removeFile, isUploading };
}
