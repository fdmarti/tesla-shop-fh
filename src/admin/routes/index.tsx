import type { RouteObject } from "react-router";

export const AdminRoutes: RouteObject[] = [
    {
        path: '/admin',
        lazy: async () => ({
            Component: (await import("../layout/AdminLayout")).AdminLayout,
        }),
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