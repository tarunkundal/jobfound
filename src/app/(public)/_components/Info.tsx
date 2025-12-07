import { benefits } from "@/lib/data/landing/feature";

const Info = () => {
    return (
        <div className="w-full mx-auto">
            <div className="border-small bg-popover w-[80%] mx-auto rounded-card px-12 py-12">
                <div className="w-[80%] mx-auto text-center flex flex-col gap-6">
                    <span className="text-sm font-medium text-brand uppercase tracking-wider">Why JobFound.ai</span>

                    <h2 className="text-brand-foreground text-3xl md:text-4xl font-bold"> The Smartest Way to
                        <br />
                        <span className="bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(236,72,153,0.35)]">
                            Find Your Next Role
                        </span>

                    </h2>
                    <h2 className="text-secondary text-xl">Traditional job searching is broken. You spend hours scrolling, tailoring resumes, and writing cover letters—only to hear nothing back. We fix that with AI.</h2>
                    <div className="pt-4">
                        <ul className="space-y-4">
                            {[
                                "AI-powered job matching with 98% accuracy",
                                "Personalized cover letters in seconds",
                                "Jobs from 50+ platforms in one place",
                                "Auto-updated feed every 6 hours",
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-brand" />
                                    </div>
                                    <span className="text-primary">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-12">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-body border-card rounded-card p-6 group hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                                    <benefit.icon className="w-5 h-5 text-brand-hover" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-brand">{benefit.stat}</div>
                                    <div className="text-xs text-secondary">{benefit.statLabel}</div>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                            <p className="text-sm text-secondary">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Info