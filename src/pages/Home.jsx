import React from 'react';
import Slider from '../components/Slider';
import Card from '../components/Card';
import CountUp from 'react-countup';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <div className='w-11/12 mx-auto my-10'>
                <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-16'>Our Best <span className='text-amber-300'> Rated </span>Services</h1>
                <Card></Card>
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