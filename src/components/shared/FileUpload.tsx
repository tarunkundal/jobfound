"use client";;
import { useUser } from "@/app/auth/_hooks/useUser";
import useCustomToast from "@/app/hooks/useCustomToast";
import { createClient } from "@/lib/supabseClient";
import { folderEnum } from "@/schema/upload.schema";
import { Button } from "@/theme/ui/components/button";
import { cn } from "@/theme/ui/utils/cn";
import { trpc } from "@/utils/trpc";
import { Slot } from "@radix-ui/react-slot";
import { Eye, EyeOff, FileText, Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import z from "zod";

interface FileUploadProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    label?: string;
    description?: string;
    accept?: string[];
    multiple?: boolean;
    maxSizeMB?: number;
    files?: File[];
    onChange?: (files: File[]) => void;
    asChild?: boolean;
    folder: z.infer<typeof folderEnum>;
}

const mimeMap: Record<string, string> = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
};

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
    (
        {
            label = "Upload files",
            description = "Drag & drop or click to browse",
            accept = [".pdf", ".png", ".jpg", ".jpeg", ".docx"],
            multiple = false,
            maxSizeMB = 5,
            files = [],
            onChange,
            asChild,
            className,
            folder,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "div";
        const [showFiles, setShowFiles] = useState(false);
        const toast = useCustomToast()
        const supabase = createClient();
        const { user } = useUser()

        const updateUserFile = trpc.upload.updateUserFile.useMutation();

        const onDrop = useCallback((acceptedFiles: File[]) => {
            void handleFiles(acceptedFiles); // run async part separately
        }, [files, multiple, user, folder, maxSizeMB, toast, onChange, supabase, updateUserFile]);

        const handleFiles = async (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 0) return;

            const validFiles = acceptedFiles.filter(
                (file) => file.size <= maxSizeMB * 1024 * 1024
            );

            if (validFiles.length === 0) {
                toast({ title: "File too large!", status: "error" });
                return;
            }

            const file = validFiles[0];
            const userId = user?.id;
            if (!userId) {
                toast({ title: "User not authenticated", status: "error" });
                return;
            }

            // ✅ correct path (no bucket name prefix)
            const filePath = `${userId}/${file.name}`;

            try {
                // 1️⃣ Remove old file if single upload
                if (files.length > 0 && !multiple) {
                    const oldFilePath = `${userId}/${files[0].name}`;
                    const { error: removeError } = await supabase.storage
                        .from(folder)
                        .remove([oldFilePath]);
                    if (removeError) console.warn("Error removing old file:", removeError);
                }

                // 2️⃣ Upload new file
                const { error: uploadError } = await supabase.storage
                    .from(folder)
                    .upload(filePath, file, { upsert: true });
                if (uploadError) throw uploadError;

                // 3️⃣ Get public URL
                const { data: publicUrlData } = supabase.storage
                    .from(folder)
                    .getPublicUrl(filePath);
                const publicUrl = publicUrlData?.publicUrl;
                if (!publicUrl) throw new Error("Public URL missing");

                // 4️⃣ Update DB using Prisma via tRPC mutation
                await updateUserFile.mutateAsync?.({ folder, filePath, publicUrl });

                // 5️⃣ Update UI
                onChange?.([file]);
                toast({
                    title: `✅ ${folder === "resumes" ? "Resume" : "Photo"} uploaded successfully!`,
                    status: "success",
                });
            } catch (err) {
                console.error("Upload error:", err);
                toast({ title: "Error uploading file!", status: "error" });
            }
        };


        const mappedAccept = accept.reduce((acc, ext) => {
            const mime = mimeMap[ext];
            if (mime) acc[mime] = [];
            return acc;
        }, {} as Record<string, string[]>);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: mappedAccept,
            multiple,
        });

        const removeFile = (file: File) => {
            onChange?.(files.filter((f) => f !== file));
        };

        return (
            <div ref={ref} className="flex flex-col gap-2 w-full">
                {label && (
                    <label className="text-sm font-semibold text-primary">{label}</label>
                )}

                <Comp
                    {...getRootProps()}
                    className={cn(
                        "relative flex flex-col items-center justify-center m-2 p-6 border-2 border-dashed border-brand rounded-lg cursor-pointer transition-all ease-in-out",
                        isDragActive
                            ? "bg-brand/10"
                            : "hover:border-brand-hover hover:bg-accent/5",
                        "focus-within:ring-2 focus-within:ring-brand/40",
                        className
                    )}
                    {...props}
                >
                    <input {...getInputProps()} />
                    <Upload className="h-6 w-6 text-brand mb-2" />
                    {files.length > 0 && (
                        <div className="flex items-center gap-2 text-secondary font-semibold">
                            <p>{files.length} file{files.length > 1 && "s"} selected</p>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFiles((prev) => !prev);
                                }}
                                className="flex items-center gap-1 text-xs"
                            >
                                {showFiles ? (
                                    <>
                                        <EyeOff className="h-4 w-4" />
                                        Hide
                                    </>
                                ) : (
                                    <>
                                        <Eye className="h-4 w-4" />
                                        View
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                    <p className="text-sm text-secondary text-center">{description}</p>
                    <p className="text-xs text-tertiary mt-1">
                        {multiple ? "Multiple files allowed" : "Single file"} (max {maxSizeMB}MB)
                    </p>
                </Comp>

                {/* Toggleable File List */}
                {showFiles && files.length > 0 && (
                    <div className="flex flex-col gap-2 w-[90%] mx-auto my-2 max-h-[250px] overflow-y-auto border-card rounded-card bg-card p-2 shadow-card">
                        {files.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="flex items-center justify-between px-3 py-2 rounded-md border-brand hover:border-brand-hover bg-background shadow-sm"
                            >
                                <div className="flex items-center gap-2 truncate">
                                    <FileText className="h-4 w-4 text-brand" />
                                    <span className="text-sm font-medium text-primary truncate max-w-[200px]">
                                        {file.name}
                                    </span>
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => removeFile(file)}
                                    variant='ghost'
                                    size="sm"
                                >
                                    <X className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
