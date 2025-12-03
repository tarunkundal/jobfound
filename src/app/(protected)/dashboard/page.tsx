import { Spinner } from "@/theme/ui/components/spinner";
import { Suspense } from "react";
import JobFilter from "./(jobs)/jobfilters/JobFilter";
import DashboardContainer from "./DashboardContainer";
const Dashboard = () => {
    // const { data, isLoading: filePathLoading, error: erroFilePath } = trpc.upload.getUserFilePath.useQuery("resumes")
    // const { data: picdata, isLoading: picfilePathLoading, error: picerroFilePath } = trpc.upload.getUploadedFilePath.useQuery('photos')
    // const { data: parsedData, isLoading: parsingResume, error } = trpc.resume.parsedResume.useQuery()


    return (<>
        {/* <h2 className="text-center text-2xl text-secondary pt-2">Welcome Back</h2> */}
        <Suspense fallback={<Spinner isFullPage />}>
            <DashboardContainer />
        </Suspense>
    </>
    )
}

export default Dashboard
