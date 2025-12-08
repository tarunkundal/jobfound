import LazyVideoPlayerWrapper from "@/components/shared/LazyVideoPlayer";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/theme/ui/components/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    return (<div>
        <div className="flex flex-col items-center text-center w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-8">
                <Sparkles className="w-4 h-4 text-brand" />
                <span className="text-sm text-brand font-medium">AI-Powered Career Automation</span>
            </div>
            <p className="text-brand-foreground text-6xl font-bold">Stop Applying, <span className="text-brand">
                Start  </span>
                <span className="text-brand-hover">Interviewing</span>
            </p>
            <div className="text-primary flex flex-col gap-4 items-center mt-4">
                <p className="text-2xl">
                    Upload your resume once. Our AI parses your skills, matches you to the perfect jobs across the internet, and generates tailored cover letters—all automatically.
                </p>
                <p className="text-xxl w-[90%]">
                    {" We'll Get You the Interviews, You Save Countless Hours Each Week"}
                </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button className="group" size={'lg'}>
                    <Link href={ROUTES.AUTH.SIGNUP}>
                        Get Started Free
                    </Link>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </div>
        <div className="mt-20 relative animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="absolute -inset-2 bg-linear-to-b from-brand/10 via-transparent to-accent/20  to-transparent w-[99%] md:w-[90%] mx-auto rounded-xl md:rounded-full pointer-events-none " />
            <div className="glass-card p-2 md:p-4 max-w-5xl mx-auto glow-primary">
                <div className="rounded-xl overflow-hidden bg-card border-card">
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-card bg-muted/50">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/70" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                            <div className="w-3 h-3 rounded-full bg-green-500/70" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="px-4 py-1 rounded-md bg-muted text-xs text-secondary">
                                app.jobfound.ai/dashboard
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-brand-foreground">Your Top Matches</h3>
                                <p className="text-sm text-secondary">Based on your resume analysis</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-teal-400">
                                <Zap className="w-4 h-4" />
                                <span>12 new matches today</span>
                            </div>
                        </div>

                        {/* Job Cards Preview */}
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { title: "Senior Frontend Engineer", company: "TechCorp", match: 96, type: "Remote" },
                                { title: "Full Stack Developer", company: "StartupX", match: 92, type: "Hybrid" },
                                { title: "React Developer", company: "InnovateCo", match: 89, type: "Remote" },
                            ].map((job, index) => (
                                <div key={index} className="p-4 rounded-lg border-card hover:bg-card-hover transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-brand/30 to-accent/20 flex items-center justify-center text-sm font-bold text-brand">
                                            {job.company[0]}
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal-300/20 text-teal-400">
                                            {job.match}% Match
                                        </span>
                                    </div>
                                    <h4 className="font-medium text-secondary text-sm mb-1">{job.title}</h4>
                                    <p className="text-xs text-tertiary mb-2">{job.company} • {job.type}</p>
                                    <div className="flex gap-2">
                                        <Button variant='link' size="sm" className="text-xs h-7 px-3 bg-linear-to-br from-brand/60 to-accent/20">
                                            Apply Now
                                        </Button>
                                        <Button variant='link' size="sm" className="text-xs h-7 px-3">
                                            View
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* video secton */}
        <div className="flex flex-col items-center text-center w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
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