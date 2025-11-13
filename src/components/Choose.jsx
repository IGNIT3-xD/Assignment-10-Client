import React, { use } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import { motion } from 'motion/react';

const Choose = () => {
    const { theme } = use(AuthContext)
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }
    const fadeInX = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    }

    return (
        <div className='my-10 grid lg:grid-cols-4 lg:gap-4'>
            <div className='lg:grid lg:grid-cols-2 lg:col-span-3 lg:gap-4'>
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    className={`border border-black/30 ${theme === 'dark' && 'border-white/30'} rounded-md p-4`}>
                    <figure className='p-2 border rounded-full w-12'><img className={`${theme === 'dark' && 'invert'}`} width="44" height="44" src="https://img.icons8.com/ios/50/trust--v1.png" alt="trust--v1" /></figure>
                    <p className='text-xl font-medium my-2'>Trusted Local Experts</p>
                    <p className='opacity-80'>
                        As your neighborhood household service provider, we take pride in offering reliable, community-driven support for all your home needs. With years of experience and a commitment to quality, we ensure every job—big or small—is handled with care and precision.
                    </p>
                </motion.div>
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    className={`border border-black/30 ${theme === 'dark' && 'border-white/30'} rounded-md p-4`}>
                    <figure className='p-2 border rounded-full w-12'><img className={`${theme === 'dark' && 'invert'}`} width="44" height="44" src="https://img.icons8.com/ios/50/service--v1.png" alt="trust--v1" /></figure>
                    <p className='text-xl font-medium my-2'>Personalized and Convenient Service</p>
                    <p className='opacity-80'>We believe every household is different, which is why we tailor our services to match your lifestyle and preferences. Whether it’s cleaning, repairs, maintenance, or installations. Our goal is to make your life easier by offering hassle-free, flexible solutions that fit your schedule.</p>
                </motion.div>
                <motion.div
                    variants={fadeInX}
                    initial="hidden"
                    whileInView="visible"
                    className={`border lg:col-span-2 border-black/30 ${theme === 'dark' && 'border-white/30'} rounded-md p-4`}>
                    <figure className='p-2 border rounded-full w-12'><img className={`${theme === 'dark' && 'invert'}`} width="44" height="44" src="https://img.icons8.com/ios/50/cheap-2-1-1.png" alt="trust--v1" /></figure>
                    <p className='text-xl font-medium my-2'>Affordable Pricing with No Hidden Costs</p>
                    <p className='opacity-80'>Quality household services shouldn’t come with a hefty price tag. We offer transparent, competitive rates and upfront quotes so you always know what to expect. With us, there are no hidden fees or surprise charges—just honest service that delivers true value for your money.</p>
                </motion.div>
            </div>
            <div>
                <motion.div
                    variants={fadeInX}
                    initial="hidden"
                    whileInView="visible"
                    className={`border border-black/30 ${theme === 'dark' && 'border-white/30'} h-full rounded-md p-4`}>
                    <figure className='p-2 border rounded-full w-12'><img className={`${theme === 'dark' && 'invert'}`} width="44" height="44" src="https://img.icons8.com/ios/50/happy--v1.png" alt="trust--v1" /></figure>
                    <p className='text-xl font-medium my-2'>Customer Satisfaction Guaranteed</p>
                    <p className='opacity-80'>
                        Your satisfaction is our top priority. We go the extra mile to ensure every service is completed to the highest standard. From the moment you book with us to the final check-up, we keep you informed and involved. Our friendly team isn’t happy until you are, making us the trusted choice for countless local households.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Choose;