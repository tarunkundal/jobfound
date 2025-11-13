"use client";;
import { useState } from "react";
import OnboardingForm from "./onboardingForm";
import FileUpload from "@/components/shared/upload/FileUpload";
import { trpc } from "@/utils/trpc";

interface OnboardingContainerProps {
    user: {
        id: string;
        email: string;
        name?: string;
    };
}

export default function OnboardingContainer() {
    const [parsedData, setParsedData] = useState<any>(null);
    const [files, setFiles] = useState<File[]>([]);

    // Define tRPC mutation
    const parseResume = trpc.resume.parsedResume.useMutation({
        onSuccess: (data) => {
            setParsedData(data.parsedData);
        },
    });

    const handleUploadSuccess = async (uploadedPath: string) => {
        // setFilePath(uploadedPath);
        console.log('esvdkbldsbd', uploadedPath);

        await parseResume.mutateAsync();
    };

    return (
        <div className="flex flex-col">
            {/* Upload Resume Section */}
            <div className="w-[90%] bg-secondary my-[2%] mx-auto px-6 py-6 flex flex-col gap-6 border-card rounded-card ">
                <div>
                    <h2 className="text-brand-foreground text-2xl font-semibold">Upload Your Resume</h2>
                    <p className="text-secondary">Let our AI do the heavy lifting! Upload your resume to automatically fill out your profile details — saving you time and effort while ensuring accuracy.</p>
                </div>
                <FileUpload
                    label=""
                    description="Drag & drop or click to upload your resume"
                    folder='resumes'
                    accept={[".pdf", ".docx"]}
                    maxSizeMB={10}
                    files={files}
                    onChange={setFiles}
                    onUploadSuccess={handleUploadSuccess}
                    className="w-[90%] md:w-[60%] lg:w=[50%] mx-auto"
                />
            </div>

            {/* Auto-Filled Onboarding Form */}
            <OnboardingForm
                parsedData={parsedData ?? undefined}
                parsingResume={parseResume.isPending}
            // user={user}
            />
        </div>
    );
}
