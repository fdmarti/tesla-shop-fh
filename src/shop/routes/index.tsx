import { type RouteObject } from "react-router";

export const ShopRoutes: RouteObject[] = [
    {
        path: '/',
        lazy: async () => ({
            Component: (await import("../layouts/ShopLayout")).ShopLayout,
        }),
        children: [
            {
                index: true,
                lazy: async () => ({
                    Component: (await import("../pages/Home/HomePage")).HomePage,
                }),
            },
            {
                path: 'product/:slug',
                lazy: async () => ({
                    Component: (await import("../pages/Product/ProductPage")).ProductPage,
                }),
            },
            {
                path: 'gender/:gender',
                lazy: async () => ({
                    Component: (await import("../pages/Gender/GenderPage")).GenderPage,
                }),
            }
        ]
    },
]
