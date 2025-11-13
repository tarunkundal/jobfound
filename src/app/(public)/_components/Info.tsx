import { infoData } from "@/lib/data/landing/feature";
import { Icon } from "@/theme/ui/components/icon";
import Image from "next/image";

const Info = () => {
    return (
        <div className="w-full mx-auto">
            <div className="border-small bg-popover w-[80%] mx-auto rounded-card px-12 py-12">
                <div className="w-[80%] mx-auto text-center flex flex-col gap-4">
                    <h2 className="text-brand-foreground text-3xl md:text-4xl font-bold">Transform Your Job Search</h2>
                    <h2 className="text-primary text-xl md:text-2xl">Powerful features designed to streamline your job application process</h2>
                </div>
                <div
                    className="flex flex-wrap justify-center mt-12 text-left gap-6 md:gap-8 lg:gap-10 w-full max-w-6xl mx-auto"
                >
                    {infoData.map((feature, i) => (
                        <div
                            key={i}
                            className="bg-body text-primary w-full lg:w-[45%] p-6 flex flex-col items-start gap-3 border-card shadow-card rounded-card"
                        >
                            <div className="flex items-center">
                                <div className="p-3 rounded-2xl border-brand mr-4">
                                    <Icon icon={feature.icon} className="text-brand" />
                                </div>
                                <h2 className="text-xl md:text-2xl text-brand-foreground font-semibold">{feature.title}</h2>
                            </div>
                            <p className="text-base leading-relaxed mt-2">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Image src={'/cbslogo.webp'} alt='image' width={400} height={300} className="mx-auto w-[80%] md:w-[60%] lg:w-[40%] my-12" />
        </div>
    )
}

export default Info