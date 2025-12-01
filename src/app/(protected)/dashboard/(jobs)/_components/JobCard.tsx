"use client";
import CustomModal from "@/components/ui/CustomModal";
import { Prisma } from "@/generated/prisma";
import { Badge } from "@/theme/ui/components/badge";
import { Button } from "@/theme/ui/components/button";
import { Icon } from "@/theme/ui/components/icon";
import { trpc } from "@/utils/trpc";
import { FileBoxIcon } from "lucide-react";
import { useState } from "react";
import AiJobCoverletter from "./AiJobCoverletter";

type JobCardProps = {
    job: Prisma.JobGetPayload<{}>;
};
export default function JobCard({ job }: JobCardProps) {
    const {
        title,
        company,
        location,
        postedAt,
        workType,
        description,
        companyUrl,
        url,
        source,
        salary,
        externalId,
    } = job;

    const { data: coverLetter, isLoading: generatingCoverLetter, error: errorGeneratingCoverLetter, refetch: generateCoverLetter } = trpc.jobs.getAiCoverLetterForJob.useQuery(
        { selectedJob: job },
        { enabled: false }
    );

    const [showDescription, setShowDescription] = useState(false);
    const [showCoverLetter, setShowCoverLetter] = useState(false)

    const handleCoverLetterChange = async () => {
        setShowCoverLetter((prev) => !prev)
        await generateCoverLetter()
    }

    return (<>
        {showDescription && (
            <CustomModal open={showDescription} onClose={() => setShowDescription(false)} showFooter title="Job Description" description={title}>
                <div className="text-secondary">
                    <p className="text-sm leading-6">
                        {description}
                    </p>
                </div>
            </CustomModal>
        )}
        {
            showCoverLetter && (
                <CustomModal open={showCoverLetter} onClose={() => setShowCoverLetter(false)} title="AI Cover Letter" description={`Generating Cover Letter for ${company}`}>
                    <div className="text-secondary">
                        <AiJobCoverletter generatingCoverLetter={generatingCoverLetter} coverLetter={coverLetter} errorGeneratingCoverLetter={errorGeneratingCoverLetter} />
                    </div>
                </CustomModal>
            )
        }

        <div className="p-4 flex flex-col gap-3 shadow-sm hover:bg-card bg-card-hover shadow-card border-card rounded-card h-full justify-between">
            <div className="flex items-center justify-between">
                <Badge variant='purple'>Auto apply ready</Badge>
                <Badge variant='default'>{source}</Badge>
            </div>
            <div className="flex-1">
                <div>
                    <p className="text-lg text-brand-foreground">{company}</p>
                    <h2 className="font-semibold text-primary">{title}</h2>
                </div>

                {/* Job Meta */}
                <div className="flex flex-wrap gap-3 text-sm text-secondary my-2">
                    <p>{workType}</p>
                    <p>{new Date(postedAt).toLocaleDateString()}</p>
                    <p>{location}</p>
                </div>

                <div className="flex items-center justify-between my-2">
                    <Badge variant='default'>
                        {salary ? `₹${salary} / annum` : 'Salary not disclosed'}
                    </Badge>
                    {companyUrl ? (
                        <a
                            href={companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline">
                                Company
                            </Button>
                        </a>
                    ) : (
                        <Button variant="outline" disabled>
                            Company
                        </Button>
                    )}
                </div>

                <Button
                    variant='outline'
                    className="w-full"
                    prefixNode={<Icon icon={FileBoxIcon} />}
                    onClick={() => setShowDescription((prev) => !prev)}>
                    Job Description
                </Button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
                <Button variant='destructive'>
                    Not Interested
                </Button>

                {/*  Apply Button */}
                <Button>
                    Auto Apply
                </Button>
            </div>
            {/* generate the cover letter for this job */}
            <Button variant='secondary' onClick={handleCoverLetterChange} >
                Genereate Ai Cover Letter
            </Button>
        </div>
    </>
    );
}
