"use client";

import { Input } from "@/theme/ui/components/input";
import MultiSelect from "@/theme/ui/components/multiSelect";
import Select from "@/theme/ui/components/select";
import { Textarea } from "@/theme/ui/components/textarea";
import { cn } from "@/theme/ui/utils/cn";
import { Controller, useFormContext } from "react-hook-form";
import FileUpload from "./upload/FileUpload";

interface Option {
    label: string;
    value: string;
}
interface FormFieldProps {
    name: string;
    label?: string;
    placeholder?: string;
    type?:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "multiSelect"
    | "fileUpload"
    | "checkbox"
    | "radio";
    options?: Option[]; // For select or radio fields
    className?: string;
    maxSelections?: number;
    required?: boolean;
    helperText?: string;
    disabled?: boolean;
    search?: boolean;
    multiple?: boolean;
    maxSizeMB?: number;
    fileFormats?: string[]
}

/**
 * 🧩 Universal form field component
 * - Works seamlessly with React Hook Form + Zod
 * - Auto-displays error messages based on schema
 */
export const FormField: React.FC<FormFieldProps> = ({
    name,
    label,
    placeholder,
    type = "text",
    options = [],
    className,
    maxSelections,
    required,
    helperText,
    disabled,
    search,
    multiple,
    maxSizeMB,
    fileFormats
}) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors?.[name]?.message as string | undefined;

    const baseInputClass = cn(
        error
        && "border-destructive ring-destructive"

    );

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label
                    htmlFor={name}
                    className={cn(
                        "text-sm font-semibold text-primary capitalize",
                    )}
                >
                    {label}
                    {required && <span className="ml-1">*</span>}
                </label>
            )}

            {/* ---------------- TEXT / EMAIL / PASSWORD / NUMBER ---------------- */}
            {["text", "email", "password", "number", "tel"].includes(type) && (
                <Input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                    className={cn(baseInputClass, className)}
                    disabled={disabled}
                />
            )}

            {/* ---------------- TEXTAREA ---------------- */}
            {type === "textarea" && (
                <Textarea
                    id={name}
                    placeholder={placeholder}
                    {...register(name)}
                    className={cn(baseInputClass, "min-h-[80px] resize-none", className)}
                    disabled={disabled}
                />
            )}

            {/* ---------------- SELECT (custom + controlled) ---------------- */}
            {type === "select" && (
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <Select
                            options={options}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder={placeholder}
                            className={cn(
                                error && "border-destructive",
                                className
                            )}
                            disabled={disabled}
                        />
                    )}
                />
            )}

            {
                type === "multiSelect" && (
                    <Controller
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <MultiSelect
                                options={options}
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder={placeholder}
                                maxSelections={maxSelections}
                                disabled={disabled}
                                search={search}
                                className={cn(
                                    error && "border-destructive",
                                    className
                                )}

                            />
                        )}
                    />
                )
            }

            {/* ---------------- CHECKBOX ---------------- */}
            {type === "checkbox" && (
                <label className="grid grid-cols-[auto_1fr] items-center gap-2 w-fit">
                    <Input
                        type="checkbox"
                        {...register(name)}
                        className="h-4 w-4 accent-brand border-brand focus:ring-brand cursor-pointer"
                        disabled={disabled}
                    />
                    <span className="text-sm text-primary">{placeholder}</span>
                </label>
            )}

            {/* ---------------- RADIO ---------------- */}
            {type === "radio" && options.length > 0 && (
                <div className="flex flex-col gap-1">
                    {options.map((opt) => (
                        <label
                            key={opt.value}
                            className="grid grid-cols-[auto_1fr] items-center gap-2 w-fit"
                        >
                            <Input
                                type="radio"
                                value={opt.value}
                                {...register(name)}
                                className="h-4 w-4 accent-brand border-brand focus:ring-brand cursor-pointer rounded-full"
                                disabled={disabled}
                            />
                            <span className="text-sm text-primary">{opt.label}</span>
                        </label>
                    ))}
                </div>
            )}

            {/*  file upload */}
            {type === "fileUpload" && (
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <FileUpload
                            label={placeholder}
                            multiple={multiple}
                            files={field.value || []}
                            onChange={field.onChange}
                            folder='resumes'
                            accept={fileFormats}
                            maxSizeMB={maxSizeMB}
                        />
                    )}
                />
            )}


            {/* Helper Text */}
            {
                helperText && (
                    <p className="text-xs font-medium text-tertiary mt-0.5">{helperText}</p>
                )
            }

            {/* ---------------- ERROR MESSAGE ---------------- */}
            {error && (
                <p className="text-xs font-medium text-destructive mt-0.5">{error}</p>
            )}
        </div>
    );
};
