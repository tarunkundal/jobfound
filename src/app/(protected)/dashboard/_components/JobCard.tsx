import { useState } from "react";
import { Badge } from "@/theme/ui/components/badge";
import { Button } from "@/theme/ui/components/button";
import CustomModal from "@/components/ui/CustomModal";
import { FetchJobInterface } from "@/types/jobs";
import { Icon } from "@/theme/ui/components/icon";
import { FileBoxIcon } from "lucide-react";

export default function JobCard({
    title,
    company,
    location,
    postedAt,
    workType,
    description,
    companyUrl,
    url,
    source,
    salary
}: FetchJobInterface) {

    const [showDescription, setShowDescription] = useState(false);

    return (<>
        {showDescription && (
            <CustomModal open={showDescription} onClose={() => setShowDescription(false)} showFooter title="Job Description">
                <div className="text-primary">
                    <p className="text-sm leading-6">
                        {description}
                    </p>
                </div>
            </CustomModal>
        )}

        <div className="mx-auto p-4 flex flex-col gap-3 shadow-sm hover:bg-card  bg-card-hover shadow-card border-card rounded-card">
            <div className="flex items-center justify-between">
                <Badge variant='purple'>Auto apply ready</Badge>
                <Badge variant='default'>{source}</Badge>
            </div>

            <div>
                <p className="text-lg text-brand-foreground">{company}</p>
                <h2 className="font-semibold text-primary">{title}</h2>
            </div>

            {/* Job Meta */}
            <div className="flex flex-wrap gap-3 text-sm text-secondary">
                <p>{workType}</p>
                <p>{postedAt}</p>
                <p>{location}</p>
            </div>

            <div className="flex items-center justify-between">
                <Badge variant='default'>
                    {salary ? `₹${salary} / annum` : 'Salary not disclosed'}
                </Badge>
                <a
                    href={companyUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="outline">
                        Company
                    </Button>
                </a>
            </div>
            <Button
                variant='outline'
                prefixNode={<Icon icon={FileBoxIcon} />}
                onClick={() => setShowDescription((prev) => !prev)}>
                Job Description
            </Button>

            {/* Actions */}
            <div className="flex items-center justify-between">
                <Button variant='destructive'>
                    Not Interested
                </Button>

                {/* Auto Apply Button */}
                <Button>
                    Auto Apply
                </Button>
            </div>

        </div>
    </>
    );
}
