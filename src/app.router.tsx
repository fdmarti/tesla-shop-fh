import { createBrowserRouter, Navigate } from "react-router";

import { AdminRoutes } from "./admin/routes";
import { ShopRoutes } from "./shop/routes";
import { AuthRoutes } from "./auth/routes";

export const AppRouter = createBrowserRouter([
    ...ShopRoutes,
    ...AdminRoutes,
    ...AuthRoutes,
    {
        path: '*',
        element: <Navigate to="/" />
    }

])