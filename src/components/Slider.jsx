import React from 'react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import Banner1 from '../assets/Banner1.jpg';
import Banner2 from '../assets/Banner2.jpg';
import Banner3 from '../assets/Banner3.jpg';
import Button from './Button';

const Slider = () => {
    return (
        <Swiper className='absolute bottom-18 rounded-b-sm' modules={[Pagination, A11y, Autoplay]}
            spaceBetween={50}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            slidesPerView={1}
            pagination={{ clickable: true }}
        >

            <SwiperSlide>
                <img className='w-full h-[450px] md:h-[500px] object-cover brightness-70' src={Banner1} alt="" />
                <div className='text-white text-center absolute inset-0 flex items-center justify-center flex-col gap-4 p-5'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>House<span className='text-amber-300'> Cleaning </span>Solution</h1>
                    <p className='lg:text-xl mx-auto'>always been so professional in handling our teams.</p>
                    <Button></Button>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <img className='w-full h-[450px] md:h-[500px] object-cover brightness-70' src={Banner2} alt="" />
                <div className='text-white text-center absolute inset-0 flex items-center justify-center flex-col gap-4 p-5'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>House<span className='text-amber-300'> Cleaning </span>Solution</h1>
                    <p className='lg:text-xl mx-auto'>always been so professional in handling our teams.</p>
                    <Button/>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <img className='w-full h-[450px] md:h-[500px] object-cover brightness-70' src={Banner3} alt="" />
                <div className='text-white text-center absolute inset-0 flex items-center justify-center flex-col gap-4 p-5'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>House<span className='text-amber-300'> Cleaning </span>Solution</h1>
                    <p className='lg:text-xl mx-auto'>always been so professional in handling our teams.</p>
                    <Button/>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Slider;