import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/logo.png';
import { IoMdHome } from "react-icons/io";
import { MdCleaningServices, MdMiscellaneousServices } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdAddChart } from "react-icons/md";

const Navbar = () => {

    const links = <>
        <li><NavLink to={'/'}><IoMdHome /> Home</NavLink></li>
        <li><NavLink to={'/services'}><MdCleaningServices /> Services</NavLink></li>
        <li><NavLink to={'/my-services'}><MdMiscellaneousServices /> My Services</NavLink></li>
        <li><NavLink to={'/add-services'}><IoMdAddCircleOutline />Add Services</NavLink></li>
        <li><NavLink to={'/my-bookings'}><MdAddChart /> My Bookings</NavLink></li>
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
                <Link to={'/'} className='flex items-center'>
                    <img className='w-10' src={logo} alt="" />
                    <p className='text-xl font-bold'>Hero<span className='text-amber-300'>Home</span></p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to={'/auth/login'} className='btn bg-amber-300 border-none btn-xs md:btn-md'>Login/Regsister</Link>
            </div>
        </div>
    );
};

export default Navbar;