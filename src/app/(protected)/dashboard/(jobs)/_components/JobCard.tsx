"use client";;
import CustomModal from "@/components/ui/CustomModal";
import { Badge } from "@/theme/ui/components/badge";
import { Button } from "@/theme/ui/components/button";
import { Icon } from "@/theme/ui/components/icon";
import { MatchedJobInterface } from "@/types/jobs";
import { GetUserType } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { Calendar, FileBoxIcon, Home, LetterTextIcon } from "lucide-react";
import { useState } from "react";
import AiJobCoverletter from "./AiJobCoverletter";
import { Job } from "@prisma/client";

type JobCardProps = {
    job: Job | MatchedJobInterface
    userData: GetUserType
};
export default function JobCard({ job, userData }: JobCardProps) {
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
    const aiScore = (job as MatchedJobInterface).match_score;

    const { data: coverLetter, isLoading: generatingCoverLetter, error: errorGeneratingCoverLetter, refetch: generateCoverLetter } = trpc.jobs.getAiCoverLetterForJob.useQuery(
        { selectedJobId: job.id },
        { enabled: false, staleTime: Infinity },
    );
    const [showDescription, setShowDescription] = useState(false);
    const [showCoverLetter, setShowCoverLetter] = useState(false)

    const handleCoverLetterChange = async () => {
        setShowCoverLetter((prev) => !prev)
        if (!coverLetter) {
            await generateCoverLetter()
        }
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

        <div className="p-4 flex flex-col gap-3 shadow-sm hover:bg-card bg-primary shadow-card border-card rounded-card h-full justify-between">
            <div className="flex items-center justify-between">
                <Badge variant='purple'>Auto apply ready</Badge>
                <Badge variant='default' className="text-sm">{source}</Badge>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-brand-foreground">{company}</p>
                        <h2 className="font-semibold text-primary">{title}</h2>
                    </div>{aiScore !== undefined && (
                        <p className="text-success font-semibold text-xs mt-1">
                            {(aiScore)}% Match
                        </p>
                    )}
                </div>

                {/* Job Meta */}
                <div className="flex flex-wrap gap-3 text-xs font-semibold text-black my-2 items-center justify-center">
                    {workType && <p className="bg-white flex items-center gap-1 p-1 px-2 rounded-sm">{workType}</p>}
                    <p className="bg-white flex items-center gap-1 p-1 px-2 rounded-sm"> <Calendar size={12} /> {new Date(postedAt).toLocaleDateString("en-GB")}</p>
                    <p className="bg-white flex items-center gap-1 p-1 px-2 rounded-sm"><Home size={12} /> {location}</p>
                </div>

                <div className="flex items-center justify-between my-2">
                    <Badge variant='default' className="text-sm">
                        {salary ? `₹${salary}` : 'Salary not disclosed'}
                    </Badge>
                    {companyUrl ? (
                        <a
                            href={companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline">
                                Visit Company
                            </Button>
                        </a>
                    ) : (
                        <Button variant="outline" disabled>
                            Visit Company
                        </Button>
                    )}
                </div>

                <Button
                    variant='secondary'
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
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button>
                        Apply Job
                    </Button>
                </a>
            </div>
            {/* generate the cover letter for this job */}
            <Button variant='secondary' onClick={handleCoverLetterChange} disabled={!userData.enableAiCoverLetter}
                prefixNode={<Icon icon={LetterTextIcon} />}>
                Genereate Ai Cover Letter
            </Button>
        </div >
    </>
    );
}
