import { getColorClasses, steps, features } from "@/lib/data/landing/feature";

const Features = () => {
    return (<>
        {/* how it works */}
        <section id="how-it-works" className="py-16 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-muted/30 to-transparent" />

            <div className="container relative mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-sm font-medium text-brand uppercase tracking-wider">How It Works</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
                        From Resume to <span className="text-brand-hover">Dream Job</span>
                        <br />in 4 Simple Steps
                    </h2>
                    <p className="text-secondary text-lg">
                        Our AI-powered platform automates the entire job search process, saving you hours every day.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                    {steps.map((step, index) => {
                        const colors = getColorClasses(step.color);
                        return (
                            <div
                                key={index}
                                className="relative group bg-card border-card rounded-card"
                            >
                                {/* Connection Line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 left-full w-full h-[2px] bg-linear-to-r from-border to-transparent z-0" />
                                )}

                                <div className={`glass-card p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl ${colors.glow}`}>
                                    {/* Step Number */}
                                    <span className={`text-xs font-bold ${colors.text} opacity-50`}>STEP {step.step}</span>

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mt-4 mb-5 transition-transform group-hover:scale-110`}>
                                        <step.icon className={`w-7 h-7 ${colors.text}`} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-brand-foreground mb-3">{step.title}</h3>
                                    <p className="text-secondary text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
        {/* features */}
        <section id="features" className="relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

            <div className="container relative mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-sm font-medium text-teal-500 uppercase tracking-wider">Features</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
                        Powerful <span className="text-teal-400">Automations</span>
                        <br />for Your Job Search
                    </h2>
                    <p className="text-secondary text-lg">
                        Every feature is designed to save you time and increase your chances of landing interviews.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden bg-card border-card rounded-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.gradient} p-0.5 mb-5`}>
                                <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center">
                                    <feature.icon className="w-5 h-5 text-brand-foreground" />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover Gradient + Blur */}
                            <div
                                className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.gradient}
                opacity-0 group-hover:opacity-20
                backdrop-blur-md transition-all duration-500`}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    </>
    )
}

export default Features