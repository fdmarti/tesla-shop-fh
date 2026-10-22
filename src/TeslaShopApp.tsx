import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { RouterProvider } from 'react-router'
import { AppRouter } from './app.router';

const queryClient = new QueryClient()

export const TesloShopApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={AppRouter} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
