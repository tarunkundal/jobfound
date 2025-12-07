'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
    id: string;
    title: string;
    description?: string;
    status: ToastType;
    duration?: number;
    isClosable?: boolean;
}

interface ToastContextProps {
    showToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { ...toast, id };
        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, toast.duration || 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-5 right-5 z-50 space-y-2">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, translateY: -10 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            exit={{ opacity: 0, translateY: -10 }}
                            className={`p-4 rounded-lg shadow-md border-l-4 text-white w-80
                ${toast.status === 'success' && 'bg-success border-background-success'}
                ${toast.status === 'error' && 'bg-destructive border-background-destructive'}
                ${toast.status === 'info' && 'bg-blue-500 border-blue-700'}
                ${toast.status === 'warning' && 'bg-yellow-500 border-yellow-700'}
              `}
                        >
                            <div className="font-semibold">{toast.title}</div>
                            {toast.description && (
                                <div className="text-sm mt-1 opacity-90">{toast.description}</div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within ToastProvider');
    }
    return context;
};
