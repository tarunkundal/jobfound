import { GetUserType } from '@/types/user'
import { Suspense } from 'react'
import DashboardSkeletion from '../../loading'
import JobList from './JobList'

const JobsWrapper = ({ userData }: { userData: GetUserType }) => {
    return (<>
        <Suspense fallback={<DashboardSkeletion />}>
            <JobList userData={userData} />
        </Suspense>
    </>
    )
}

export default JobsWrapper