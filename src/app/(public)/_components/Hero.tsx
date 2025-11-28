import { Button } from "@/theme/ui/components/button"
import { ROUTES } from "@/constants/routes"
import Link from "next/link"
import LazyVideoPlayerWrapper from "@/components/shared/LazyVideoPlayer"

const Hero = () => {
    return (<div>
        <div className="flex flex-col items-center text-center w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
            <p className="text-brand-foreground text-6xl font-bold">Stop Applying, <span className="text-brand">
                Start  </span>
                <span className="text-brand-hover">Interviewing</span>
            </p>
            <div className="text-primary flex flex-col gap-4 items-center mt-4">
                <p className="text-3xl">We'll Get You the Interviews, You Save Countless Hours Each Week
                </p>
                <p className="text-2xl w-[90%]">
                    Have AI Apply to hundreds of relevant positions in the time it takes to submit one manual application!
                </p>
                <p className="text-xl w-[80%]">
                    Simply upload a resume, set your job preferences, and let our AI auto apply to jobs on your behalf!</p>
            </div>
            <div className="mt-8">
                <Button
                    className="px-6 py-5 font-semibold text-lg"
                >
                    <Link href={ROUTES.AUTH.SIGNUP} prefetch={true}>
                        Sign Up Now!
                    </Link>
                </Button>
            </div>
            <div className="mt-12 h-auto w-[90%] md:w-[80%] lg:w-[80%] p-2 border-4 border-brand-hover rounded-2xl">
                <LazyVideoPlayerWrapper
                    src="/videos/HeroVideo.mp4"
                    autoPlay
                    loop
                    muted
                    controls={false}
                    height={400}
                    className="rounded-2xl"
                    overlay={
                        <div>
                            <h2 className="italic">When we auto apply to jobs every application is tailored to the job description, increasing your likelihood of getting an interview!
                            </h2>
                        </div>
                    }
                />
            </div>
        </div>
    </div >
    )
}

export default Hero