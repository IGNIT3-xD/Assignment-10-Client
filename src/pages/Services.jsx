import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAxios } from './../hooks/useAxios';
import Card2 from './../components/Card2';
import PriceRange from '../components/PriceRange';

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

    if (loading) {
        return <p className='my-20 text-3xl font-bold text-center'>Loading...</p>
    }

    return (
        <div className='w-11/12 mx-auto'>
            <div className='flex flex-col items-center my-6'>
                <h1 className='font-bold text-2xl lg:text-3xl px-4 text-center'>All <span className='text-amber-300'> Services </span></h1>
                <div>
                    <PriceRange />
                </div>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    data.map(service => <Card2 key={service._id} service={service}></Card2>)
                }
            </div>
        </div>
    );
};

export default Services;