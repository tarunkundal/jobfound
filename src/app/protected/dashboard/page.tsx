"use client";;
import { createClient } from "@/lib/supabseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/theme/ui/components/button";
import FileUpload from "@/components/shared/FileUpload";
import OnBoarding from "../onboarding/page";

const Dashboard = () => {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push("/auth/login");
    };

    console.log(files);

    return (<>
        <OnBoarding />
        <FileUpload
            label="Upload your Resume"
            description="Drag & drop or click to upload"
            // multiple
            folder='resumes'
            accept={[".pdf", ".docx"]}
            maxSizeMB={10}
            files={files}
            onChange={setFiles}
        />
        <Button variant='destructive' onClick={handleLogout} isLoading={loading}>Log Out</Button>
    </>
    )
}

export default Dashboard