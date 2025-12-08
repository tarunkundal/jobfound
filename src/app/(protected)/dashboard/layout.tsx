export const runtime = "nodejs";
import { ReactNode } from 'react';
import JobFilter from './(jobs)/jobfilters/JobFilter';

const JobsLayout = ({ children }: { children: ReactNode }) => {
    return (<>
        <JobFilter />
        {children}
    </>
    )
}

export default JobsLayout