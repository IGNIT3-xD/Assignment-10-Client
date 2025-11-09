import React from 'react';
import Slider from '../components/Slider';
import CountUp from 'react-countup';
import { useLoaderData } from 'react-router';
import Card2 from '../components/Card2';

const Home = () => {
    const services = useLoaderData()
    return (
        <div>
            <Slider></Slider>
            <div className='w-11/12 mx-auto'>
                <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-10 lg:mb-16'>Our Best <span className='text-amber-300'> Rated </span>Services</h1>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        services.map(service => <Card2 key={service._id} service={service}></Card2>)
                    }
                </div>
                <div className='my-16 p-8 bg-linear-to-l from-amber-600 to-amber-300 text-center text-white rounded-lg'>
                    <h1 className='text-3xl font-bold'>Trusted by Lads, Built for You</h1>
                    <div className='flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 mt-8'>
                        <div className='space-y-3'>
                            <p >Total Customers</p>
                            <p className='font-bold text-4xl'><CountUp end={5688} enableScrollSpy />+</p>
                            <p>21% more than last month</p>
                        </div>
                        <div className='space-y-3'>
                            <p>Total Reviews</p>
                            <p className='font-bold text-4xl'><CountUp end={4500} enableScrollSpy />+</p>
                            <p>46% more than last month</p>
                        </div>
                        <div className='space-y-3'>
                            <p>Active Customers</p>
                            <p className='font-bold text-4xl'><CountUp end={1877} enableScrollSpy />+</p>
                            <p>70% retrun customers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;