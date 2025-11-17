import { folderEnum } from "@/schema/upload.schema";
import z from "zod";

export interface FileUploadProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    label?: string;
    description?: string;
    accept?: string[];
    multiple?: boolean;
    maxSizeMB?: number;
    files?: File[];
    onChange?: (files: File[]) => void;
    onUploadSuccess?: (uploadedPath: string) => void;
    asChild?: boolean;
    folder: z.infer<typeof folderEnum>;
}

export interface useFileUploadProps {
    multiple?: boolean;
    maxSizeMB?: number;
    files?: File[];
    onChange?: (files: File[]) => void;
    onUploadSuccess?: (uploadedPath: string) => void;
    folder: z.infer<typeof folderEnum>;
}