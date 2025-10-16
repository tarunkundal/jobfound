'use client'
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize'

export const Textarea = ({ ...props }: TextareaAutosizeProps) => {
    return <TextareaAutosize {...props} />
}