import useCustomToast from "@/hooks/useCustomToast"
import { Button } from "@/theme/ui/components/button"
import { Spinner } from "@/theme/ui/components/spinner"
import { useState } from "react"

interface AiJobCoverletterProps {
    generatingCoverLetter: boolean
    coverLetter?: string
    errorGeneratingCoverLetter: any
}

const AiJobCoverletter = ({ generatingCoverLetter, coverLetter, errorGeneratingCoverLetter }: AiJobCoverletterProps) => {
    const [copied, setCopied] = useState(false)
    const toast = useCustomToast()

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(coverLetter!);
            setCopied(true);
            toast({
                status: 'success',
                title: 'Copied Successfully!'
            })
            // setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };
    return (<>
        {generatingCoverLetter && (
            <div className="py-6 text-center flex flex-col items-center justify-center">
                <p className="text-sm text-tertiary">Please Wait!</p>
                <p className="text-sm text-secondary">Generating your cover letter...</p>
                <Spinner />
            </div>
        )}

        {!generatingCoverLetter && coverLetter && (
            <div className="space-y-4 p-2">
                <p className="text-sm whitespace-pre-line bg-body rounded-card p-2">
                    {coverLetter}
                </p>

                <Button
                    className="w-full"
                    variant="secondary"
                    onClick={handleCopy}
                    disabled={copied}
                >
                    {copied ? 'Copied Successfully!' : 'Copy Cover Letter'}
                </Button>
            </div>
        )}

        {errorGeneratingCoverLetter && (
            <p className="text-destructive text-sm py-4">
                Failed to generate. Try again.
            </p>
        )}
    </>
    )
}

export default AiJobCoverletter