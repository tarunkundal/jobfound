"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/theme/ui/components/badge";
import { Button } from "@/theme/ui/components/button";

interface JobCardProps {
    title: string;
    company: string;
    location: string;
    seniority: string;
    postedAt: string;
    match: number;
    workType: string; // Remote / On-site / Hybrid
    autoApplyReady: boolean;
    description: string;
    applied?: boolean;
}

export default function JobCard({
    title,
    company,
    location,
    seniority,
    postedAt,
    match,
    workType,
    autoApplyReady,
    description,
    applied = true,
}: JobCardProps) {

    const [showDescription, setShowDescription] = useState(false);

    return (
        <div className="bg-secondary p-5 shadow-sm hover:shadow-md transition shadow-card border-card rounded-card">

            {/* Top */}
            <div className="flex items-center justify-between">
                <span>
                    {applied ?
                        <Badge variant='outline'>Applied</Badge> :
                        <Badge variant='secondary'>Not Applied</Badge>
                    }
                </span>

                <span className="text-sm font-semibold text-blue-600">
                    {match}% Match
                </span>
            </div>

            {/* Company Name */}
            <p className="mt-2 text-sm text-gray-500">{company}</p>
            <h2 className="text-lg font-semibold mt-1">{title}</h2>

            {/* Auto-Apply Badge */}
            {autoApplyReady && (
                <Badge variant='purple'>Auto apply ready</Badge>
            )}

            {/* Job Meta */}
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                <p>{workType}</p>
                <p>{postedAt}</p>
                <p>{seniority}</p>
                <p>{location}</p>
            </div>

            {/* Description Toggle */}
            <Button
                onClick={() => setShowDescription((prev) => !prev)}
            >
                Job Description
            </Button>

            {showDescription && (
                <p className="mt-2 text-gray-700 text-sm">{description}</p>
            )}

            {/* Actions */}
            <div className="mt-5 flex items-center justify-between">

                {/* Left side buttons */}
                <div className="flex gap-3">
                    {/* Not Interested */}
                    <button className="flex items-center gap-1 px-3 py-1 border rounded-lg text-red-600 hover:bg-red-50 transition text-sm">
                        <X size={16} />
                        Not Interested
                    </button>

                    {/* Mark as Applied */}
                    <button className="flex items-center gap-1 px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100 transition text-sm">
                        <Check size={16} />
                        Mark as Applied
                    </button>
                </div>

                {/* Auto Apply Button */}
                <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition">
                    Auto Apply
                </button>
            </div>

        </div>
    );
}
