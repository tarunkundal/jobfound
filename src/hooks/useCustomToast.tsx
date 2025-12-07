import { useToastContext } from "@/app/providers/ToastProvider";

type CustomToastOptions = {
    title: string;
    description?: string;
    status: 'info' | 'warning' | 'success' | 'error';
    duration?: number;
    isClosable?: boolean;
};

type ToastFunction = (options: CustomToastOptions) => void;

const useCustomToast = (): ToastFunction => {
    const { showToast } = useToastContext();

    const customToast: ToastFunction = (options) => {
        showToast({
            title: options.title,
            description: options.description,
            status: options.status,
            duration: options.duration,
            isClosable: options.isClosable,
        });
    };

    return customToast;
};

export default useCustomToast;
