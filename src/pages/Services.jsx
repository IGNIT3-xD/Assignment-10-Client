import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAxios } from './../hooks/useAxios';
import Card2 from './../components/Card2';
import PriceRange from '../components/PriceRange';
import Loader from './../components/Loader';

const Services = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const instance = useAxios()

    useEffect(() => {
        instance.get('/services')
            .then(res => {
                // console.log(res.data);
                setData(res.data)
                setLoading(false)
            })
    }, [instance])

    const handleSearch = (e) => {
        const search = e.target.value;
        // console.log(search);
        instance.get(`/search?search=${search}`)
            .then(res => {
                // console.log(res.data);
                setData(res.data)
            })
    }

    if (loading) {
        return <Loader/>
    }

    const maxPrice = Math.max(...data.map(service => service.ratePerHour || 0))
    // console.log(maxPrice);

    return (
        <div className='w-11/12 mx-auto'>
            <div className='flex flex-col md:flex-row items-center justify-between w-full lg:px-4 mt-6 shadow rounded-md'>
                <div className='shadow rounded-md p-4 hover:shadow-xl transition-all'>
                    <legend className="fieldset-legend">Search by service name</legend>
                    <label className="input mt-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input onChange={handleSearch} type="search" placeholder="Search" />
                    </label>
                </div>
                <PriceRange maxPrice={maxPrice} setData={setData} />
            </div>
            <h1 className='font-bold text-2xl lg:text-3xl text-center my-8'>All <span className='text-amber-300'> Services </span><span className='text-xs'>({data.length})</span></h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10'>
                {
                    data.length === 0 ? <p className='text-4xl font-bold text-center md:col-span-2 lg:col-span-3'>No <span className='text-amber-300'>Service</span> Found</p> :
                        data.map(service => <Card2 key={service._id} service={service}></Card2>)
                }
            </div>
        </div>
    );
};

export default Services;