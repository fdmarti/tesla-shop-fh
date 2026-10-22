import { Navigate, type RouteObject } from "react-router";

export const AuthRoutes: RouteObject[] = [
    {
        path: '/auth',
        lazy: async () => ({
            Component: (await import("../layouts/AuthLayout")).AuthLayout,
        }),
        children: [
            { index: true, element: <Navigate to="/auth/login" /> },
            {
                path: 'login',
                lazy: async () => ({
                    Component: (await import("../pages/Login/LoginPage")).LoginPage,
                }),
            },
            {
                path: 'register',
                lazy: async () => ({
                    Component: (await import("../pages/Register/RegisterPage")).RegisterPage,
                }),
            }
        ]
    }
]
