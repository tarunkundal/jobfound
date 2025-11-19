"use client";;
import { Button } from "@/theme/ui/components/button";
import { cn } from "@/theme/ui/utils/cn";
import { FileUploadProps } from "@/types/Upload";
import { mimeMap } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import { Eye, EyeOff, FileText, Upload, X } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFileUpload } from "./useFileUpload";
import { Spinner } from "@/theme/ui/components/spinner";

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
            onUploadSuccess,
            folder,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "div";
        const [showFiles, setShowFiles] = useState(false);
        const { uploadFile, isUploading, removeFile } = useFileUpload({ folder, maxSizeMB, onChange, multiple, files, onUploadSuccess })

        const mappedAccept = accept.reduce((acc, ext) => {
            const mime = mimeMap[ext];
            if (mime) acc[mime] = [];
            return acc;
        }, {} as Record<string, string[]>);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: (acceptedFiles) => acceptedFiles.forEach(uploadFile),
            accept: mappedAccept,
            multiple,
            disabled: isUploading
        });

        return (
            <div ref={ref} className={cn(
                "flex flex-col gap-2 w-full",
                className
            )}>
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
                    )}
                    {...props}
                >
                    <input {...getInputProps()} />
                    {isUploading ?
                        <div className="flex items-center gap-2 text-secondary font-semibold">
                            <p>Uploading</p>
                            <Spinner />
                        </div> : <>
                            <Upload className="h-6 w-6 text-brand mb-2 disabled:cursor-not-allowed" />
                            {files.length > 0 && (
                                <div className="flex items-center gap-2 text-secondary font-semibold">
                                    {files.map((file, index) => {
                                        return <div key={`${file.name}-${index}`} className="flex flex-col">
                                            {file.name}
                                        </div>
                                    })}
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
                            )}</>
                    }
                    <p className="text-sm text-secondary text-center">{description}</p>
                    <p className="text-xs text-tertiary mt-1">
                        {multiple ? "Multiple files allowed" : "Single file"} (max {maxSizeMB}MB)
                    </p>
                </Comp>

                {/* Toggleable File List */}
                {showFiles && files.length > 0 && (
                    <div className="flex flex-col gap-2 w-[90%] mx-auto my-2 max-h-[250px] overflow-y-auto border-card rounded-card bg-card p-2 shadow-card">
                        {files.map((file, index) => {
                            const fileType = file?.type;
                            const isImage = fileType?.startsWith("image/");
                            const isPDF = fileType === "application/pdf";

                            return (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="flex items-center justify-between px-3 py-2 rounded-md border-brand hover:border-brand-hover bg-background shadow-sm"
                                >
                                    <div className="flex items-center gap-2 truncate">
                                        {/* Thumbnail / Icon */}
                                        {isImage ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                className="h-10 w-10 object-cover rounded-md border"
                                            />
                                        ) : isPDF ? (
                                            <FileText className="h-6 w-6 text-red-500" />
                                        ) : (
                                            <FileText className="h-6 w-6 text-brand" />
                                        )}

                                        {/* File name */}
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-primary truncate max-w-[200px]">
                                                {file.name}
                                            </span>
                                            <span className="text-xs text-tertiary">
                                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <Button
                                        type="button"
                                        onClick={() => removeFile(file)}
                                        variant="ghost"
                                        size="sm"
                                        disabled={isUploading}
                                    >
                                        <X className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        );
    }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
