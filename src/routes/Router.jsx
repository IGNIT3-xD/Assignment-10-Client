import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from './../pages/Home';
import Services from './../pages/Services';
import MyServices from './../pages/MyServices';
import AddServices from './../pages/AddServices';
import MyBookings from './../pages/MyBookings';
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ServiceDetails from "../pages/ServiceDetails";

export const router = createBrowserRouter([
    {
        hydrateFallbackElement: <p className="text-2xl font-bold text-center my-10">Loading...</p>,
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                element: <Home />,
                loader: () => fetch('http://localhost:5000/top-services').then(res => res.json())
            },
            {
                path: 'services',
                element: <Services />
            },
            {
                path: 'my-services',
                element: <PrivateRoute><MyServices /></PrivateRoute>
            },
            {
                path: 'services/:id',
                element: <PrivateRoute><ServiceDetails /></PrivateRoute>
            },
            {
                path: 'add-services',
                element: <PrivateRoute><AddServices /></PrivateRoute>
            },
            {
                path: 'my-bookings',
                element: <PrivateRoute><MyBookings /></PrivateRoute>
            },
            {
                path: 'auth/login',
                element: <PublicRoute><Login /></PublicRoute>
            },
            {
                path: '/auth/registration',
                element: <PublicRoute><Register /></PublicRoute>
            }
        ]
    },
]);