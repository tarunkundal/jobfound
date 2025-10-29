'use client'
import * as React from 'react'
import { cn } from '../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    prefixNode?: React.ReactNode
    suffixNode?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, prefixNode, suffixNode, ...props }, ref) => {
        return (
            <div className="w-full relative">
                {prefixNode && (
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 [&>svg]:size-4">
                        {prefixNode}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex h-8 w-full text-sm text-primary rounded-md border-brand bg-transparent px-3 placeholder:text-placeholder focus:outline-brand-hover focus:border-brand focus:ring-brand disabled:cursor-not-allowed disabled:opacity-50 hover:ring-1 hover:ring-brand',
                        prefixNode && 'pl-8',
                        suffixNode && 'pr-8',
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {suffixNode && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 [&>svg]:size-4">
                        {suffixNode}
                    </div>
                )}
            </div>
        )
    },
)
Input.displayName = 'Input'

export { Input }
