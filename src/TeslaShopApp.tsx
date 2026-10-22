import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { RouterProvider } from 'react-router'
import { AppRouter } from './app.router';

import { Toaster } from "@/components/ui/sonner"
import type { PropsWithChildren } from 'react';
import { CustomLoading } from './components/custom/CustomLoading';
import { useAuthStore } from './auth/store/auth.store';

const queryClient = new QueryClient()

const CheckAuthProvider = ({ children }: PropsWithChildren) => {

    const { checkAuthStatus } = useAuthStore()

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,
        refetchInterval: 1000 * 60 * 1.5,
    })

    if (isLoading) return <CustomLoading />

    return children
}

export const TesloShopApp = () => {
    return (
        <QueryClientProvider client={queryClient}>

            <CheckAuthProvider>
                <RouterProvider router={AppRouter} />
            </CheckAuthProvider>

            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
        </QueryClientProvider>
    )
}
