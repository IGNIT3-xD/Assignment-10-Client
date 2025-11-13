import React from 'react';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10 mt-10">
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Plumbing</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Wash</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
            </nav>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a href='facebook.com' target='_blank'>
                        <FaFacebook className='w-8 h-8' />
                    </a>
                    <a href='instagram.com' target='_blank'>
                        <FaInstagram className='w-8 h-8' />
                    </a>
                    <a href='x.com' target='_blank'>
                        <FaXTwitter className='w-8 h-8' />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;