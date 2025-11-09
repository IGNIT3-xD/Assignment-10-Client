import React, { useEffect, useState } from 'react';
import { useAxios } from '../hooks/useAxios';
import { use } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import Swal from 'sweetalert2';

const MyBookings = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const instance = useAxios()
    const { user } = use(AuthContext)

    useEffect(() => {
        instance.get(`/booking?email=${user.email}`)
            .then(res => {
                setData(res.data);
                setLoading(false)
            })
    }, [instance, user])

    const handleCancel = (id) => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "oklch(70.9% 0.169 91.605)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/booking/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your booking has been canceled.",
                                icon: "success"
                            });

                            const remainingData = data.filter(service => service._id !== id)
                            setData(remainingData)
                        }
                    })
            }
        });
    }

    if (loading) {
        return <p className='my-20 text-3xl font-bold text-center'>Loading...</p>
    }

    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='font-bold text-2xl md:text-3xl text-center my-6'>My <span className='text-amber-300'> Bookings </span> <span className='text-xs'>({data.length})</span> </h1>
            {
                data.length === 0 ? <p className='text-2xl my-10 text-center font-bold'>Currently you don't have any <span className='text-amber-300'>booking</span></p> :
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
            }
        </div>
    );
};

export default MyBookings;