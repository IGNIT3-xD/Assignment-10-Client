import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router'
import Footer from './../components/Footer';

const Root = () => {
    return (
        <div className='flex min-h-screen flex-col'>
            <Navbar></Navbar>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;