import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface IconProps {
    icon: LucideIcon;
    className?: string;
}

export function Icon({ icon: IconComponent, className }: IconProps) {
    return <IconComponent className={twMerge("w-5 h-5", className)} />;
}
