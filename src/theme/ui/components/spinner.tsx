import { Loader2 } from 'lucide-react'

export const Spinner = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <Loader2 className="animate-loading text-secondary" />
        </div>
    )
}