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
import Profile from './../pages/Profile';
import Error404 from "../pages/Error404";
import Loader from './../components/Loader';

export const router = createBrowserRouter([
    {
        errorElement: <Error404 />,
        hydrateFallbackElement: <Loader />,
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                element: <Home />,
                loader: () => fetch('https://herohomeserver.vercel.app/top-services').then(res => res.json())
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
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
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