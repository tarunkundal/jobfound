import { featureData, featureData2 } from "@/lib/data/landing/feature"
import { Icon } from "@/theme/ui/components/icon"

const Features = () => {
    return (
        <div className="w-full text-center px-4 py-12">
            <h2 className="text-3xl md:text-4xl text-primary font-bold mb-10">
                How JobFound Works in 4 Simple Steps
            </h2>
            <div
                className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 w-full max-w-6xl mx-auto text-left"
            >
                {featureData.map((feature, i) => (
                    <div
                        key={i}
                        className="bg-small text-secondary w-full sm:w-[45%] lg:w-[22%] p-6 flex flex-col items-start gap-3 border-card shadow-card rounded-card transition-transform duration-300 hover:scale-105
        "
                    >
                        <div className="p-3 rounded-2xl border-brand">
                            <Icon icon={feature.icon} className="text-primary" />
                        </div>

                        <p className="text-sm font-medium">{feature.step}</p>
                        <h2 className="text-xl md:text-2xl text-primary font-semibold">{feature.title}</h2>
                        <p className="text-base leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-3xl md:text-4xl text-primary font-bold mt-20">
                    Ways to Use JobFound
                </h2>
                <h2 className="text-xl md:text-2xl text-secondary mb-10">
                    Choose how you want JobFound to work for you
                </h2>
                <div
                    className="flex flex-wrap justify-center text-left gap-6 md:gap-8 lg:gap-10 w-full max-w-6xl mx-auto"
                >
                    {featureData2.map((feature, i) => (
                        <div
                            key={i}
                            className="bg-small text-secondary w-full sm:w-[45%] lg:w-[30%] p-6 flex flex-col items-start gap-3 border-card shadow-card rounded-card transition-transform duration-300 hover:scale-105"
                        >
                            <div className="p-3 rounded-2xl border-brand ">
                                <Icon icon={feature.icon} className="text-brand" />
                            </div>
                            <h2 className="text-xl md:text-2xl text-primary font-semibold">{feature.title}</h2>
                            <p className="text-base leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Features