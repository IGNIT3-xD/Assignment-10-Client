import React, { use } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader';

const PublicRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation()

    if (loading) {
        return <Loader/>
    }

    if (user)
        return <Navigate state={location?.pathname} to={'/'}></Navigate>

    return (
        children
    );
};

export default PublicRoute;