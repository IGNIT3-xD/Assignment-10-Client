import React from 'react';
import Slider from '../components/Slider';
import CountUp from 'react-countup';
import { useLoaderData, Link } from 'react-router';
import Card2 from '../components/Card2';
import Card from '../components/Card';
import Choose from '../components/Choose';
import Faq from '../components/Faq';
import { ScrollAnim } from '../components/ScrollAnim';

const Home = () => {
    const services = useLoaderData()
    return (
        <div>
            <Slider></Slider>
            <div className='w-11/12 mx-auto'>
                <ScrollAnim>
                    <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-10'>Our Best <span className='text-amber-300'> Rated </span>Services</h1>
                </ScrollAnim>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 items-stretch'>
                    {
                        services.map(service => <Card key={service._id} service={service}></Card>)
                    }
                    <Link to={'/services'} className='underline text-amber-300 hover:text-amber-400'>See more...</Link>
                </div>
                <div className='my-10 p-8 bg-linear-to-l from-amber-600 to-amber-300 text-center text-white rounded-lg'>
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
                <div>
                    <h1 className='text-2xl lg:text-3xl font-bold text-center'>Why<span className='text-amber-300'> Choose </span>Us?</h1>
                    <Choose />
                    <h1 className='text-2xl lg:text-3xl font-bold text-center my-10'>Frequently <span className='text-amber-300'>ask</span> and question</h1>
                    <Faq />
                </div>
            </div>
        </div>
    );
};

export default Home;