import { Loader2 } from 'lucide-react'

interface SpinnerProps {
    isFullPage?: boolean
    text?: string
}

export const Spinner = ({ isFullPage, text }: SpinnerProps) => {
    return (
        <div className={`h-full w-full flex justify-center items-center ${isFullPage ? 'h-screen' : ''}`}>
            <Loader2 className="animate-loading text-secondary" />
            {text && <span className="ml-2 text-secondary">{text}</span>}
        </div>
    )
}