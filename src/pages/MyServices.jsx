import React from 'react';

const MyServices = () => {
    return (
        <div>
            <h1 className='font-bold text-2xl md:text-3xl text-center my-6'>My <span className='text-amber-300'> Service </span></h1>
            <div className='my-20 overflow-x-auto'>
                <table className="table border border-black/10 bg-white">
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Service Name</th>
                            <th>Provider Email</th>
                            <th>Customer Phone No.</th>
                            <th>Customer Email</th>
                            <th>Service Price</th>
                            <th>Service Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((service, i) =>
                                <tr key={service._id}>
                                    <th>{i + 1}</th>
                                    <td>{service.service_name}</td>
                                    <td>{service.provider_email}</td>
                                    <td>{service.customer_phone}</td>
                                    <td>{service.customer_email}</td>
                                    <td className='font-bold'>${service.price}</td>
                                    <td>{service.date}</td>
                                    <td>
                                        <button onClick={() => handleCancel(service._id)} className='btn btn-xs text-green-600 outline outline-amber-500'>Cancel</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyServices;