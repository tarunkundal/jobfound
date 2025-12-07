import { Separator } from "@/theme/ui/components/separator"
import Link from "next/link"

const Footer = () => {
    return (<>
        {/* Bottom */}
        <Separator />
        <div className="flex items-center justify-between w-[90%] mx-auto">
            <div>
                <a href="#" className="flex  gap-2 ">
                    <span className="text-lg font-bold text-brand-foreground">
                        JobFound<span className="text-brand">.ai</span>
                    </span>
                </a>
                <p className="text-secondary text-sm max-w-sm text-left">
                    AI-powered career automation that helps you find, match, and apply to your dream jobs 10x faster.
                </p>
            </div>
            <p className="text-sm text-secondary text-center">
                © 2025 JobFound.ai. All rights reserved.
            </p>
            <div>
                <h2 className="text-xl font-bold text-brand-foreground mb-2">Contact Us</h2>
                <h2 className="text-sm text-secondary text-left">Have questions? Reach out to us at
                    <br></br>
                    <span className="text-brand">
                        <Link href={''}>
                            {' '} jobfound.ai@gmail.com
                        </Link>
                    </span>
                </h2>
            </div>
        </div>
    </>
    )
}

export default Footer