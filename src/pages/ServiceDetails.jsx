import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useAxios } from '../hooks/useAxios';
import { useEffect } from 'react';
import { FaRegStar } from "react-icons/fa";

const ServiceDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const instance = useAxios()

    useEffect(() => {
        instance.get(`services/${id}`)
            .then(res => {
                // console.log(res.data);
                setData(res.data)
                setLoading(false)
            })
    }, [instance, id])

    console.log(data);

    if (loading) {
        return <p className='my-20 text-3xl font-bold text-center'>Loading...</p>
    }

    return (
        <div className='my-10 w-11/12 mx-auto'>
            <div className='flex flex-col lg:flex-row gap-8 shadow p-4'>
                <figure className='p-2 border border-black/5 rounded-sm'>
                    <img className='mx-auto object-contain h-full rounded-sm md:w-full lg:w-96' src={data?.image} alt="" />
                </figure>
                <div className='flex-1'>
                    <p className='text-2xl font-bold'>{data?.serviceName}</p>
                    <p className='text-black/60 mt-3'>{data?.description}</p>
                    <div className="divider"></div>
                    <p className='font-semibold'>Provider: <span className='text-black/70'>{data?.providerName}</span></p>
                    <p className='font-semibold'>Provider Email: <span className='text-black/70'>{data?.providerEmail}</span></p>
                    <p className='font-semibold'>Location: <span className='text-black/70'>{data?.location}</span></p>
                    <div className="divider"></div>
                    <div className=''>
                        <p className='font-semibold flex items-center'>
                            <span>Rating: <span className='m-1 text-amber-300'>{data?.rating}</span></span>
                            <FaRegStar className='text-amber-300' />
                        </p>
                        <p className='badge badge-warning mt-3'>{data?.category}</p>
                    </div>
                    <div className="divider"></div>
                    <p className='text-xl font-bold'>Price: <span className='text-amber-300'>${data?.ratePerHour}</span> / hour</p>
                    <button className='btn bg-amber-400 mt-3'>Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;