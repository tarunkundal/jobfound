'use client';

import * as React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import { cn } from '../utils/cn';

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
    ({ className, ...props }, ref) => {
        return (
            <TextareaAutosize
                ref={ref}
                {...props}
                className={cn(
                    'flex h-8 w-full text-sm text-primary rounded-md border-brand bg-transparent px-3 placeholder:text-placeholder focus:outline-brand-hover focus:border-brand focus:ring-brand disabled:cursor-not-allowed disabled:opacity-50 hover:ring-1 hover:ring-brand',
                    className
                )}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
