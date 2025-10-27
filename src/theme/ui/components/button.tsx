'use client'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { cn } from '../utils/cn'

const buttonVariants = cva(
    'inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-lg text-sm transition-colors outline-none select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--color-ring] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-brand text-brand-foreground border border-brand hover:bg-brand-hover [&_svg]:!text-brand-foreground',
                secondary: 'bg-secondary text-primary border border-secondary hover:bg-hover-secondary',
                outline: 'bg-transparent text-primary border border hover:text-tertiary',
                destructive: 'bg-destructive text-destructive hover:bg-destructive/90',
                ghost: 'text-secondary hover:bg-hover hover:text-foreground',
                link: 'text-primary underline-offset-4 hover:text-brand',
                icon: 'bg-transparent hover:bg-hover rounded-md',
            },
            size: {
                lg: 'h-9 px-3 py-2',
                sm: 'h-8 rounded-md px-2.5 text-xs',
                xs: 'h-7 px-2 rounded-md gap-2 text-xs [&_svg]:size-3.5',
                icon: 'h-6 w-6',
                'icon-xs': 'h-5 w-5 [&_svg]:!size-3',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'sm',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
    prefixNode?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, prefixNode, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
                {isLoading ? (
                    <div className="w-full flex items-center justify-center">
                        <Loader2 className="animate-spin absolute" />
                        <span className={cn(isLoading && 'opacity-0')}>{children}</span>
                    </div>
                ) : (
                    <>
                        {prefixNode && (
                            <div className="flex items-center h-full mx-2 shrink-0 [&>svg]:size-4">
                                {prefixNode}
                            </div>
                        )}
                        {children}
                    </>
                )}
            </Comp>
        )
    }
)

Button.displayName = 'Button'
export { Button, buttonVariants }

