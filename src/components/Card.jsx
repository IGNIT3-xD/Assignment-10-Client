import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from './../contexts/AuthContext';
import { FaRegStar } from 'react-icons/fa';
import { ScrollAnim } from './ScrollAnim';

const Card = ({ service }) => {
    const { serviceName, image, category, ratePerHour, rating } = service
    const { theme } = use(AuthContext)
    return (
        <ScrollAnim>
            <div className={`card bg-base-100 w-full h-[420px] shadow-md hover:shadow-2xl transition duration-200 ${theme === "dark" && 'border border-white/20'}`}>
                <figure className='w-full h-56 overflow-hidden'>
                    <img className='w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105'
                        src={image}
                        alt="service image" />
                </figure>
                <div className="card-body p-5 flex flex-col justify-between min-h-60">
                    <h2 className="card-title font-bold">
                        {serviceName}
                    </h2>
                    <div className="card-actions flex items-center justify-between my-3">
                        <p className='font-medium text-[18px]'>Rate/Hour : <span className='font-bold text-amber-400'>{ratePerHour} $</span></p>
                        <div className="badge border border-amber-300 bg-amber-100/60">{category}</div>
                    </div>
                    <p className='font-medium text-[18px] flex items-center'>
                        <span>Rating: <span className='m-1 text-amber-300 font-bold'>{rating}</span></span>
                        <FaRegStar className='text-amber-300' />
                    </p>
                    <Link to={`/services/${service._id}`} className='btn bg-amber-300 mt-3 hover:bg-amber-400 transition duration-200'>View Details</Link>
                </div>
            </div>
        </ScrollAnim>
    );
};

export default Card;