"use client";;
import FileUpload from "@/components/shared/upload/FileUpload";
import { createClient } from "@/lib/supabseClient";
import { Button } from "@/theme/ui/components/button";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OnBoarding from "../onboarding/page";

const Dashboard = () => {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const { data, isLoading, error } = trpc.upload.getUserFilePath.useQuery("resumes")
    const [files, setFiles] = useState<File[]>([]);
    console.log('file signed url is', data, isLoading, error);


    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push("/auth/login");
    };

    // 🧩 when we have a signed URL, convert it to a "File" blob for preview
    useEffect(() => {
        const fetchFileFromUrl = async () => {
            if (data?.signedFileUrl) {
                const res = await fetch(data.signedFileUrl);
                console.log('responseis', res);

                const blob = await res.blob();
                const file = new File([blob], "uploaded_resume.pdf", { type: blob.type });
                setFiles([file]);
            } else {
                setFiles([]);
            }
        };

        fetchFileFromUrl();
    }, [data]);

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
            <OnBoarding />
        </div>
        <Button variant='destructive' onClick={handleLogout} isLoading={loading}>Log Out</Button>
    </div>
    )
}

export default Dashboard