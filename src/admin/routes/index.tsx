import type { RouteObject } from "react-router";
import { AdminLayout } from '../layout/AdminLayout'
import { AdminAuthenticatedRoute } from "@/components/routes/protectedRoutes";

export const AdminRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: (
            <AdminAuthenticatedRoute>
                <AdminLayout />
            </AdminAuthenticatedRoute>
        ),
        children: [
            {
                index: true,
                lazy: async () => ({
                    Component: (await import("../pages/Dashboard/DashboardPage")).DashboardPage,
                }),
            },
            {
                path: 'products',
                lazy: async () => ({
                    Component: (await import("../pages/Products/AdminProductsPage")).AdminProductsPage,
                }),
            },
            {
                path: 'products/:slug',
                lazy: async () => ({
                    Component: (await import("../pages/Product/AdminProductPage")).AdminProductPage,
                }),
            }
        ]
    },
]