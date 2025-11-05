'use client'
import { useUser } from "@/app/auth/_hooks/useUser";
import useCustomToast from "@/app/hooks/useCustomToast";
import { createClient } from "@/lib/supabseClient";
import { useFileUploadProps } from "@/types/Upload";
import { filePathConstructor, getFileExtension } from "@/utils";
import { trpc } from "@/utils/trpc";
import { useState } from 'react';

export function useFileUpload({ folder, maxSizeMB, onChange, multiple, files }: useFileUploadProps) {
    const supabase = createClient();
    const { user } = useUser();
    const toast = useCustomToast();
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const { mutateAsync: updateUserFile } = trpc.upload.updateUserFile.useMutation();
    const { data: oldFilePath } = trpc.upload.getUserFilePath.useQuery(folder)

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
        const extension = folder === 'resumes' ? "pdf" : getFileExtension(file)
        const filePath = `${userId}/${filePathConstructor[folder]}.${extension}`;

        setIsUploading(true)
        await supabase.storage.from(folder).remove([oldFilePath?.filePath]);
        const { error } = await supabase.storage.from(folder).upload(filePath, file, { upsert: true, cacheControl: "0", });
        // 4️⃣ Update DB using Prisma via tRPC mutation
        const { success, filePath: uploadFilePath, message } = await updateUserFile({ folder: folder, filePath: filePath });
        setIsUploading(false)

        if (error && !success) {
            toast({ title: error.message || "Error while uploading!", status: "error" });
            throw new Error("Upload or DB update failed");
        }
        console.log('filepath uplod', success, message, uploadFilePath);

        onChange?.(multiple ? [...<[]>files, file] : [file]);
        toast({ title: "Upload successful!", status: "success" });

    };

    const removeFile = async (file: File) => {
        if (!userId) throw new Error("User not authenticated");
        const { error } = await supabase.storage.from(folder).remove([oldFilePath?.filePath]);
        const { success } = await updateUserFile({ folder: folder, filePath: '' });
        if (error && !success) {
            toast({ title: error.message || "Error while deleting!", status: "error" });
            throw new Error("Delete failed");
        }
        onChange?.((files ?? []).filter(f => f !== file));
        toast({ title: "Removed successful!", status: "success" });
    };

    return { uploadFile, removeFile, isUploading };
}
