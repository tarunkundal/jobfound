import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"
import React from "react"
import { Spinner } from "@/theme/ui/components/spinner"

// Dynamically import VideoPlayer with SSR disabled
const LazyVideoPlayer = dynamic(() => import("@/components/shared/VideoPlayer"), {
    ssr: false, // prevents video from being rendered server-side
    loading: () => (
        <Spinner isFullPage={true} text="Loading video..." />
    ),
})

const LazyVideoPlayerWrapper: React.FC<React.ComponentProps<typeof LazyVideoPlayer>> = (props) => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Load only once when it comes into view
        rootMargin: "200px", // Start loading a bit before it comes into view
    })

    return (
        <div ref={ref} className="w-full">
            {inView ? <LazyVideoPlayer {...props} /> : (
                <Spinner isFullPage={true} text="Loading video..." />
            )}
        </div>
    )
}

export default LazyVideoPlayerWrapper