"use client";;
import FileUpload from "@/components/shared/upload/FileUpload";
import { createClient } from "@/lib/supabseClient";
import { Button } from "@/theme/ui/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OnBoarding from "../onboarding/page";

const Dashboard = () => {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    // const { data, isLoading: filePathLoading, error: erroFilePath } = trpc.upload.getUserFilePath.useQuery("resumes")
    // const { data: picdata, isLoading: picfilePathLoading, error: picerroFilePath } = trpc.upload.getUserFilePath.useQuery('photos')
    const [files, setFiles] = useState<File[]>([]);
    const [photos, setphotos] = useState<File[]>([]);
    // const { data: parsedData, isLoading: parsingResume, error } = trpc.resume.parsedResume.useQuery()
    const parsedData = { parsedData: {} }
    const parsingResume = false
    console.log('file signed url is', parsedData, parsingResume);


    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push("/login");
    };

    return (<div>
        <div className="flex flex-col p-2 gap-4">
            <FileUpload
                label=""
                description="Drag & drop or click to upload your resume"
                folder='resumes'
                accept={[".pdf", ".docx"]}
                maxSizeMB={10}
                files={files}
                onChange={setFiles}
                className="w-[90%] md:w-[60%] lg:w=[50%] mx-auto"
            />
            <OnBoarding parsedData={parsedData?.parsedData ?? undefined} parsingResume={parsingResume} />
        </div>
        <Button variant='destructive' onClick={handleLogout} isLoading={loading}>Log Out</Button>
    </div>
    )
}

export default Dashboard