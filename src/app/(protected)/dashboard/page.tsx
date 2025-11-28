"use client";;
import DashboardContainer from "./DashboardContainer";
const Dashboard = () => {
    // const { data, isLoading: filePathLoading, error: erroFilePath } = trpc.upload.getUserFilePath.useQuery("resumes")
    // const { data: picdata, isLoading: picfilePathLoading, error: picerroFilePath } = trpc.upload.getUploadedFilePath.useQuery('photos')

    // const { data: parsedData, isLoading: parsingResume, error } = trpc.resume.parsedResume.useQuery()


    return (<>
        <h2 className="text-center text-2xl text-secondary">Welcome Back</h2>
        <DashboardContainer />
    </>
    )
}

export default Dashboard
