const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen bg-primary">
            <div className='w-1/2 flex flex-col items-center'>
                {children}
            </div>
            <div className="w-1/2 relative overflow-hidden bg-body">
                {/* <Image src="/logo2.png" alt="Logo" fill className="object-cover" /> */}
            </div>
        </div >
    )
}

export default AuthLayout