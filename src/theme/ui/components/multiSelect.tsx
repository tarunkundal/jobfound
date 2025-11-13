"use client";

import { Check, ChevronDown, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { Button } from "./button";
import { Input } from "./input";
import useCustomToast from "@/hooks/useCustomToast";

interface SelectOption {
    label: string;
    value: string;
}

interface MultiSelectProps {
    placeholder?: string;
    options: SelectOption[];
    value: string[];
    onChange: (values: string[]) => void;
    className?: string;
    maxSelections?: number;
    search?: boolean;
    disabled?: boolean;
}

/**
 * 🎨 Themed MultiSelect Component (in sync with Select)
 * - Matches Select styling
 * - Supports search (optional)
 * - Closes when clicking outside
 */
const MultiSelect: React.FC<MultiSelectProps> = ({
    placeholder = "Select options",
    options,
    value = [],
    onChange,
    className,
    maxSelections,
    search = false,
    disabled
}) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const ref = useRef<HTMLDivElement | null>(null);

    const toast = useCustomToast()

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = search
        ? options.filter((opt) =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : options;

    const toggleOption = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(value.filter((v) => v !== optionValue));
        } else {
            if (!maxSelections || value.length < maxSelections) {
                onChange([...value, optionValue]);
            } else {
                toast({
                    title: `Already selected ${maxSelections} items`,
                    status: 'warning'
                })
            }
        }
    };

    const selectedLabels = options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label)
        .join(", ");

    return (
        <div ref={ref} className="relative w-full">
            {/* Trigger */}
            <Button
                type="button"
                variant='outline'
                onClick={() => setOpen(!open)}
                disabled={disabled}
                className={cn(
                    "flex h-8 w-full items-center justify-between gap-2 rounded-md border-brand bg-transparent px-3 py-2 text-sm text-primary",
                    "placeholder:text-placeholder focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/40 hover:ring-1 hover:ring-brand transition",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
            >
                <span className="truncate text-left">
                    {selectedLabels || placeholder}
                </span>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 text-brand transition-transform duration-200",
                        open && "rotate-180"
                    )}
                />
            </Button>

            {/* Dropdown */}
            {open && (
                <div
                    className={cn(
                        "absolute z-50 mt-1 w-full rounded-card border-brand bg-card text-primary shadow-card",
                        "animate-in fade-in-0 zoom-in-95"
                    )}
                >
                    {/* Search input (optional) */}
                    {search && (
                        <div className="p-2">
                            <Input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search..."
                                prefixNode={<SearchIcon />}
                            />
                        </div>
                    )}

                    {/* Options */}
                    <div className="max-h-[200px] overflow-y-auto p-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => {
                                const selected = value.includes(opt.value);
                                return (
                                    <div
                                        key={opt.value}
                                        onClick={() => toggleOption(opt.value)}
                                        className={cn(
                                            "relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm",
                                            "text-primary hover:bg-brand-hover transition"
                                        )}
                                    >
                                        <span className="pl-6">{opt.label}</span>
                                        {selected && (
                                            <Check className="absolute left-1 h-4 w-4 text-brand" />
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center text-xs">No results found...</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
