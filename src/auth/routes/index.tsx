import { Navigate, type RouteObject } from "react-router";
import { AuthLayout } from '../layouts/AuthLayout'
import { NotAuthenticatedRoute } from "@/components/routes/protectedRoutes";

export const AuthRoutes: RouteObject[] = [
    {
        path: '/auth',
        element: (
            <NotAuthenticatedRoute>
                <AuthLayout />
            </NotAuthenticatedRoute>
        ),
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
