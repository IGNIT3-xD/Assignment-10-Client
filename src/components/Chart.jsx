import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = ({ data, booked, myBooking, totalRevenue }) => {
    const chartData = [
        {
            name: 'My Services',
            value: data.length,
        },
        {
            name: 'My Bookings',
            value: myBooking.length,
        },
        {
            name: 'Booked My Services',
            value: booked.length,
        },
        {
            name: 'Total Revenue',
            value: totalRevenue
        }
    ];

    return (
        <div className='mx-auto p-2'>
            <ComposedChart className='shadow mx-auto w-full p-2'
                layout="horizontal"
                style={{ maxHeight: '40vh', aspectRatio: 1 / 1.618 }}
                responsive
                data={chartData}
                margin={{
                    top: 20,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" barSize={40} fill="oklch(80.0% 0.169 91.605)" />
            </ComposedChart>
        </div>
    );
};

export default Chart;