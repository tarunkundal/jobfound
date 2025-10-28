"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../utils/cn";

interface SelectOption {
    label: string;
    value: string;
}

interface CustomSelectProps {
    placeholder?: string;
    options: SelectOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
}

/**
 * 🎨 Themed Custom Select Component
 * - Uses your Tailwind + Design Tokens
 * - Dropdown appears below
 * - Scrolls if options exceed max height
 */
const Select: React.FC<CustomSelectProps> = ({
    placeholder = "Select an option",
    options,
    value,
    onValueChange,
    className,
}) => {
    return (
        <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
            {/* Trigger */}
            <SelectPrimitive.Trigger
                className={cn(
                    "flex h-8 w-full items-center justify-between gap-2 rounded-md border-brand bg-transparent px-3 py-2 text-sm font-semibold text-primary",
                    "placeholder:text-placeholder focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/40 hover:ring-1 hover:ring-brand transition",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
            >
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon asChild>
                    <ChevronDown className="h-4 w-4 text-brand transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>

            {/* Dropdown Content */}
            <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                    side="bottom"
                    align="start"
                    position="popper"
                    sideOffset={4}
                    className={cn(
                        "z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-brand bg-card text-primary shadow-card",
                        "animate-in fade-in-0 zoom-in-95"
                    )}
                >
                    {/* Scroll Up Button */}
                    <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 bg-card">
                        <ChevronUp className="h-4 w-4 text-brand transition-transform duration-200 group-hover:-translate-y-0.5" />
                    </SelectPrimitive.ScrollUpButton>

                    {/* Options List */}
                    <SelectPrimitive.Viewport className="max-h-[200px] overflow-y-auto p-1">
                        {options.map((opt) => (
                            <SelectPrimitive.Item
                                key={opt.value}
                                value={opt.value}
                                className={cn(
                                    "relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none",
                                    "text-primary hover:bg-brand-hover data-[highlighted]:bg-brand-hover data-[highlighted]:text-primary",
                                    "focus:bg-brand-hover transition"
                                )}
                            >
                                {/* ✅ Tick on left */}
                                <SelectPrimitive.ItemIndicator className="absolute left-1 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-brand" />
                                </SelectPrimitive.ItemIndicator>

                                <SelectPrimitive.ItemText className="pl-6">
                                    {opt.label}
                                </SelectPrimitive.ItemText>
                            </SelectPrimitive.Item>
                        ))}
                    </SelectPrimitive.Viewport>

                    {/* Scroll Down Button */}
                    <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 bg-card">
                        <ChevronDown className="h-4 w-4 text-brand transition-transform duration-200 group-hover:translate-y-0.5" />
                    </SelectPrimitive.ScrollDownButton>
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
    );
};

export default Select;
