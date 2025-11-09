import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router'
import Footer from './../components/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div className='flex min-h-screen flex-col'>
            <Navbar></Navbar>
            <div className='pt-16 flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
            <ToastContainer />
        </div>
    );
};

export default Root;