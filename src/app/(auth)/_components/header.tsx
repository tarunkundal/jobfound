import { Button } from "@/theme/ui/components/button"
import Image from "next/image"

const AuthHeader = () => {
    return (
        <div className="flex justify-between items-center border-2 px-[10%]" >
            <Image src="/logo2.webp" alt="Logo" width={70} height={70} title="dchvd jhsjbh" />
            <div className="flex items-center justify-center" >
                <Button variant="link" className="mr-4" >About</Button>
                <Button variant="default" size='lg' >Sign In</Button>
            </div>
        </div>
    )
}

export default AuthHeader