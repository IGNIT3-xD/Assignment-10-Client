import React, { use } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PublicRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation()

    if (loading) {
        return <p className='my-20 text-2xl font-bold text-center'>Loading...</p>
    }

    if (user)
        return <Navigate state={location?.pathname} to={'/'}></Navigate>

    return (
        children
    );
};

export default PublicRoute;