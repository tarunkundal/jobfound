"use client";
import React from "react";
import { cn } from "@/theme/ui/utils/cn";

interface VideoPlayerProps {
    src: string
    poster?: string
    autoPlay?: boolean
    loop?: boolean
    muted?: boolean
    controls?: boolean
    background?: boolean
    className?: string
    overlay?: React.ReactNode
    objectFit?: "cover" | "contain"
    width?: number | string
    height?: number | string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
    poster,
    autoPlay = false,
    loop = false,
    muted = false,
    controls = false,
    background = false,
    className,
    overlay,
    objectFit = "cover",
    width = "100%",
    height = "auto",
}) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-start bg-primary",
                className
            )}
            style={{ width }}
        >
            {/* ✅ VIDEO CONTAINER */}
            <div
                className={cn("w-full overflow-hidden", className)}
                style={{
                    height,
                    backgroundColor: background ? "black" : undefined,
                }}
            >
                <video
                    className="block w-full h-full"
                    style={{ objectFit }}
                    poster={poster}
                    loop={loop}
                    autoPlay={autoPlay}
                    muted={muted}
                    controls={controls}
                    playsInline
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* ✅ TEXT BELOW VIDEO */}
            {overlay && (
                <div className="text-secondary my-2 px-4 w-full max-w-prose text-center">
                    {overlay}
                </div>
            )}
        </div>
    )
}

export default VideoPlayer
