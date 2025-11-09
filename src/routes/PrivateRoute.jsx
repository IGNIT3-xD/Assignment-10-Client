import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation()

    if (loading) {
        return <p className='my-20 text-3xl font-bold text-center'>Loading...</p>
    }

    if (user) {
        return children;
    }

    return (
        <Navigate state={location?.pathname} to={'/auth/login'}></Navigate>
    );
};

export default PrivateRoute;