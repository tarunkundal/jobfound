"use client";;
import FileUpload from "@/components/shared/upload/FileUpload";
import { createClient } from "@/lib/supabseClient";
import { Button } from "@/theme/ui/components/button";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OnBoarding from "../onboarding/page";

const Dashboard = () => {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    // const { data, isLoading, error } = trpc.upload.getUserFilePath.useQuery("resumes")
    const [files, setFiles] = useState<File[]>([]);
    const { data: parsedData, isLoading, error } = trpc.resume.parsedResume.useQuery()
    console.log('file signed url is', parsedData, isLoading, error);


    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push("/auth/login");
    };

    return (<div>
        <div className="flex flex-col p-2 gap-4">
            <FileUpload
                label=""
                description="Drag & drop or click to upload your resume"
                folder='resumes'
                accept={[".pdf", ".docx"]}
                // accept={[".png", ".jpg", ".jpeg"]}
                maxSizeMB={10}
                files={files}
                onChange={setFiles}
                className="w-[90%] md:w-[60%] lg:w=[50%] mx-auto"
            />
            <OnBoarding parsedData={parsedData?.parsedData ?? undefined} />
        </div>
        <Button variant='destructive' onClick={handleLogout} isLoading={loading}>Log Out</Button>
    </div>
    )
}

export default Dashboard