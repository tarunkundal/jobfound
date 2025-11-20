"use client";

import { Input } from "@/theme/ui/components/input";
import MultiSelect from "@/theme/ui/components/multiSelect";
import Select from "@/theme/ui/components/select";
import { Textarea } from "@/theme/ui/components/textarea";
import { cn } from "@/theme/ui/utils/cn";
import { useEffect, useState } from "react";
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
    | "commaSeparatedInput"
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
    fileFormats?: string[];
    defaultValue?: any
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
    fileFormats,
    defaultValue
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
                    defaultValue={defaultValue}
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
                    defaultValue={defaultValue}
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

            {/* ---------------- SKILLS INPUT (store array, show comma string) ---------------- */}
            {type === "commaSeparatedInput" && (
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => {
                        const [displayValue, setDisplayValue] = useState(
                            Array.isArray(field.value) ? field.value.join(", ") : ""
                        );

                        //Sync field.value into local displayValue state
                        useEffect(() => {
                            if (Array.isArray(field.value)) {
                                // Only update the display if the RHF value is different from the current display value
                                // to avoid an infinite loop if handleChange is running
                                const newDisplay = field.value.join(", ");
                                if (newDisplay !== displayValue) {
                                    setDisplayValue(newDisplay);
                                }
                            } else if (field.value === undefined || field.value === null) {
                                setDisplayValue("");
                            }
                        }, [field.value]);

                        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                            const input = e.target.value;
                            setDisplayValue(input);

                            // If input is empty → clear the array
                            if (input.trim() === "") {
                                field.onChange([]);
                                return;
                            }
                            // Convert comma-separated text → array
                            const arr = input
                                .split(",")
                                .map(s => s.trim())
                                .filter(Boolean);

                            field.onChange(arr);
                        };

                        return (
                            <Input
                                id={name}
                                placeholder={placeholder || "React, Node.js, Next.js"}
                                value={displayValue}
                                onChange={handleChange}
                                // onBlur={handleBlur}
                                className={cn(baseInputClass, className)}
                                disabled={disabled}
                                type="text"
                            />
                        );
                    }}
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
