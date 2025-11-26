"use client";;
import { createClient } from "@/lib/supabseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { Button } from "@/theme/ui/components/button";
import JobList from "./_components/JobList";
import OnboardingPage from "../onboarding/page";
const Dashboard = () => {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const { data: getUserData } = trpc.user.getUser.useQuery();
    // const { data, isLoading: filePathLoading, error: erroFilePath } = trpc.upload.getUserFilePath.useQuery("resumes")
    // const { data: picdata, isLoading: picfilePathLoading, error: picerroFilePath } = trpc.upload.getUploadedFilePath.useQuery('photos')

    // const { data: parsedData, isLoading: parsingResume, error } = trpc.resume.parsedResume.useQuery()
    const fetchAllJobs = trpc.jobs.getAllJobs.useQuery()
    const parsedData = { parsedData: {} }
    const parsingResume = false
    console.log('file signed url is', getUserData);


    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push("/login");
        // await fetchAllJobs.data
    };

    return (<div>
        <div className="flex flex-col p-2 gap-4">
            {
                !getUserData?.isOnboarded ?
                    <OnboardingPage /> :
                    <JobList />}
        </div>
        <Button variant='destructive' onClick={handleLogout} isLoading={loading}>Log Out</Button>
    </div>
    )
}

export default Dashboard
