import Image from "next/image"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen bg-primary">
            <div className='w-1/2 flex flex-col items-center mx-auto '>
                {/* <div className='w-[90%] flex flex-col items-center mx-auto '> */}
                {children}
            </div>
            <div className="w-1/2 relative overflow-hidden bg-body md:flex hidden items-center justify-center">
                <Image src="/logo2.png" alt="Logo" fill className="object-cover" />
            </div>
        </div >
    )
}

export default AuthLayout