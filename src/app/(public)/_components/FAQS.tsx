"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { faqsData } from "@/lib/data/landing/faqsData";
import { Button } from "@/theme/ui/components/button";
import { cn } from "@/theme/ui/utils/cn";
const FAQS = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
            <h2 className="text-brand-foreground text-4xl font-bold text-center">Frequently Asked Questions</h2>
            <h2 className="text-2xl text-primary text-center">Let's answer some questions!</h2>

            <div className="space-y-4 mt-6">
                <h2 className="text-primary text-2xl font-semibold">General Questions</h2>
                {faqsData.map((faq, i) => (
                    <div
                        key={i}
                        className="bg-card border border-card rounded-card shadow-card transition-all"
                    >
                        <Button
                            variant='ghost'
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex justify-between items-center p-5 text-left"
                        >
                            <span className="text-sm lg:text-lg font-semibold text-brand-foreground">
                                {faq.question}
                            </span>
                            <ChevronDown
                                className={cn(
                                    "w-5 h-5 text-brand transition-transform duration-100",
                                    openIndex === i && "rotate-180"
                                )}
                            />
                        </Button>

                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-100 px-5",
                                openIndex === i ? "max-h-40 pb-4" : "max-h-0"
                            )}
                        >
                            <p className="text-primary text-sm leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQS