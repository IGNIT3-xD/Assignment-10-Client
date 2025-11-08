import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from './../pages/Home';
import Services from './../pages/Services';
import MyServices from './../pages/MyServices';
import AddServices from './../pages/AddServices';
import MyBookings from './../pages/MyBookings';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'services',
                element: <Services />
            },
            {
                path: 'my-services',
                element: <MyServices />
            },
            {
                path: 'add-services',
                element: <AddServices />
            },
            {
                path: 'my-bookings',
                element: <MyBookings />
            }
        ]
    },
]);