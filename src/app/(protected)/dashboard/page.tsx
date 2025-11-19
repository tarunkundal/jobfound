"use client";;
import { createClient } from "@/lib/supabseClient";
import { Button } from "@/theme/ui/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OnboardingPage from "../onboarding/page";
import JobList from "./_components/JobList";

const Dashboard = () => {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    // const { data, isLoading: filePathLoading, error: erroFilePath } = trpc.upload.getUserFilePath.useQuery("resumes")
    // const { data: picdata, isLoading: picfilePathLoading, error: picerroFilePath } = trpc.upload.getUploadedFilePath.useQuery('photos')

    // const { data: parsedData, isLoading: parsingResume, error } = trpc.resume.parsedResume.useQuery()
    // const fetchAllJobs = trpc.jobs.getAllJobs.useMutation()
    const parsedData = { parsedData: {} }
    const parsingResume = false
    console.log('file signed url is', parsedData, parsingResume);


    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push("/login");
        // await fetchAllJobs.mutateAsync()
    };

    return (<div>
        <div className="flex flex-col p-2 gap-4">
            <OnboardingPage />
        </div>
        {/* <JobCard
            title="Lead Software Engineer (Full-Stack Developer)"
            company="Selah Digital"
            url="mjbhvg"
            location="Bangalore, Karnataka, India"
            postedAt="Nov 13"
            workType="On-site"
            salary={'47468'}
            source="linkedin"
            companyUrl={'https://ecliptiq.vercel.app/'}
            description="We are looking for a full-stack engineer with strong experience in Next.js, Node.js..."
        /> */}
        <JobList />
        <Button variant='destructive' onClick={handleLogout} isLoading={loading}>Log Out</Button>
    </div>
    )
}

export default Dashboard
