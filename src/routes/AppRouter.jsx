import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserDash from "../pages/UserDashPage";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../components/Layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                index: true,
                element: <HomePage />
            
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
            {
                path: "/dashboard",
                element: <UserDash />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
]);

export default function AppRouter() {
    return (
        <RouterProvider router={router} />
    );
}