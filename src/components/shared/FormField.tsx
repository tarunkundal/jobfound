"use client";

import { Input } from "@/theme/ui/components/input";
import Select from "@/theme/ui/components/select";
import { Textarea } from "@/theme/ui/components/textarea";
import { cn } from "@/theme/ui/utils/cn";
import { useFormContext, Controller } from "react-hook-form";

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
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio";
    options?: Option[]; // For select or radio fields
    className?: string;
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
        <div className="flex flex-col gap-1 max-w-[300px]">
            {label && (
                <label
                    htmlFor={name}
                    className={cn(
                        "text-sm font-semibold text-primary capitalize",
                    )}
                >
                    {label}
                </label>
            )}

            {/* ---------------- TEXT / EMAIL / PASSWORD / NUMBER ---------------- */}
            {["text", "email", "password", "number"].includes(type) && (
                <Input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                    className={cn(baseInputClass, className)}
                />
            )}

            {/* ---------------- TEXTAREA ---------------- */}
            {type === "textarea" && (
                <Textarea
                    id={name}
                    placeholder={placeholder}
                    {...register(name)}
                    className={cn(baseInputClass, "min-h-[80px] resize-none", className)}
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
                        />
                    )}
                />
            )}

            {/* ---------------- CHECKBOX ---------------- */}
            {type === "checkbox" && (
                <label className="flex items-center gap-2">
                    <Input
                        type="checkbox"
                        {...register(name)}
                        className="h-4 w-4 accent-brand border-brand focus:ring-brand"
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
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <Input
                                type="radio"
                                value={opt.value}
                                {...register(name)}
                                className="h-4 w-4 accent-brand border-brand focus:ring-brand"
                            />
                            <span className="text-sm text-primary">{opt.label}</span>
                        </label>
                    ))}
                </div>
            )}

            {/* ---------------- ERROR MESSAGE ---------------- */}
            {error && (
                <p className="text-xs font-medium text-destructive mt-0.5">{error}</p>
            )}
        </div>
    );
};
