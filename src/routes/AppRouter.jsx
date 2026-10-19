import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserDash from "../pages/UserDashPage";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../components/Layout";
import AdminDashPage from "../pages/AdminDashPage";
import MySubscriptionsPage from "../pages/MySubscriptionsPage";
import ProtectedRoute from "../components/ProtectedRoute";

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
                path: "/dashboard",
                element: (<ProtectedRoute> <UserDash /> </ProtectedRoute>)
            },
            {
                path: "/admindashboard",
                element: (<ProtectedRoute> <AdminDashPage /> </ProtectedRoute>)
            },
            {
                path:"/subscriptions",
                element:(<ProtectedRoute> <MySubscriptionsPage/> </ProtectedRoute>)
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