const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-auto">
            <div className='w-[90%] md:w-[70%] lg:w-[40%] flex flex-col items-center mx-auto bg-primary border-card my-[3%] rounded-card'>
                {children}
            </div>
        </div >
    )
}

export default AuthLayout