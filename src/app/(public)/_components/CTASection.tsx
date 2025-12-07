import { ROUTES } from "@/constants/routes";
import { Button } from "@/theme/ui/components/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
    return (
        <section className="pt-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-brand/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

            <div className="container relative mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-8">
                        <Sparkles className="w-4 h-4 text-brand" />
                        <span className="text-sm text-brand font-medium">Start your AI-powered job search today</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Ready to Land Your
                        <br />
                        <span className="bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                            Dream Job?
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Join thousands of professionals who've transformed their job search with AI.
                        Upload your resume and get matched to perfect opportunities in minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button className="group" size={'lg'}>
                            <Link href={ROUTES.AUTH.SIGNUP}>
                                Get Started Free
                            </Link>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mt-6">
                        No credit card required • Free forever plan available
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
