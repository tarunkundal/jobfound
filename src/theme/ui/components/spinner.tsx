import { Loader2 } from 'lucide-react'

export const Spinner = ({ isFullPage }: { isFullPage?: boolean }) => {
    return (
        <div className={`h-full w-full flex justify-center items-center ${isFullPage ? 'h-screen' : ''}`}>
            <Loader2 className="animate-loading text-secondary" />
        </div>
    )
}