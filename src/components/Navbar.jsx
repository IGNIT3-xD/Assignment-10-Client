import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/services'}>Services</NavLink></li>
        <li><NavLink to={'/my-services'}>My Services</NavLink></li>
        <li><NavLink to={'/add-services'}>Add Services</NavLink></li>
        <li><NavLink to={'/my-bookings'}>My Bookings</NavLink></li>
    </>

    return (
        <div className="fixed left-1/2 top-0 transform -translate-x-1/2 z-10 navbar backdrop-filter backdrop-blur-lg lg:px-14 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <p className='text-xl font-bold'>Hero<span className='text-amber-400'>Home</span></p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to={'/auth/login'} className='btn bg-amber-400 border-none btn-xs md:btn-md'>Login/Regsister</Link>
            </div>
        </div>
    );
};

export default Navbar;