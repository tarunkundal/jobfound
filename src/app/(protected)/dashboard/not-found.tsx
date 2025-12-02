
const JobsNotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center h-screen">
            <h2 className="text-2xl font-semibold text-secondary">No Jobs Found!</h2>
            <p className="text-tertiary mt-2">
                We could not find any jobs matching your criteria.
            </p>
        </div>)
}

export default JobsNotFoundPage