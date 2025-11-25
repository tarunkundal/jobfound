import { Button } from "@/theme/ui/components/button";
import { Separator } from "@/theme/ui/components/separator";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface CustomModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children?: ReactNode;
    showFooter?: boolean;
    footerContent?: React.ReactNode;
}

export default function CustomModal({
    open,
    onClose,
    title,
    description,
    children,
    showFooter = true,
    footerContent,
}: CustomModalProps) {
    return (
        <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <Dialog.Portal container={typeof window !== "undefined"
                ? document.getElementById("modal-root")!
                : undefined
            }>
                {/* Overlay */}
                <Dialog.Overlay className="fixed inset-0  backdrop-blur-[3px] z-40
                    data-[state=open]:animate-in data-[state=open]:fade-in-50
                    data-[state=closed]:animate-out data-[state=closed]:fade-out-50"
                />

                {/* CENTERED CONTENT */}
                <Dialog.Content
                    className="
                        fixed 
                        top-1/2 left-1/2 
                        -translate-x-1/2 -translate-y-1/2
                        w-[90%]
                        md:w-[75%] 
                        lg:w-[55%] 
                        max-w-2xl 
                         bg-card
                        p-2 z-50
                        rounded-card
                        border-card
                        max-h-[80vh]
                        overflow-y-auto
                        px-2 py-2
                        data-[state=open]:animate-in 
                        data-[state=open]:fade-in-50
                    "
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-1">
                        <div>
                            {title && (
                                <Dialog.Title className="text-base font-semibold text-brand-foreground">
                                    {title}
                                </Dialog.Title>
                            )}
                            {description && (
                                <Dialog.Description className="text-secondary mt-1 text-sm">
                                    {description}
                                </Dialog.Description>
                            )}
                        </div>

                        <Button
                            onClick={onClose}
                            variant="destructive"
                            size="xs"
                            className="transform transition-transform duration-200 ease-in-out hover:rotate-180"
                        >
                            <X size={14} />
                        </Button>
                    </div>
                    <Separator />

                    {/* Body */}
                    <div className="my-2">
                        {children}
                    </div>

                    <Separator />
                    {/* Footer */}
                    {showFooter && (
                        <div className="flex justify-end mt-1">
                            {footerContent ? (
                                footerContent
                            ) : (
                                <Button variant="destructive" size='xs' onClick={onClose}>
                                    Close
                                </Button>
                            )}
                        </div>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
