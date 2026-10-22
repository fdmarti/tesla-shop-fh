import { toast, type ExternalToast } from 'sonner'

type Message = 'default' | 'error' | 'success'

export const useToast = () => {

    const showToast = (message: string, type: Message = 'default') => {
        const toastConfig: ExternalToast = {
            duration: 1000 * 3,
        }

        switch (type) {
            case 'default':
                return toast(message, toastConfig)
            case 'success':
                return toast.success(message, toastConfig)
            case 'error':
                return toast.error(message, toastConfig)
            default:
                return toast(message, toastConfig)
        }
    }

    return {
        showToast
    }
}