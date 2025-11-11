import React, { useEffect, useRef, useState } from 'react';
import { useAxios } from '../hooks/useAxios';
import { use } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import Swal from 'sweetalert2';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const MyBookings = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const instance = useAxios()
    const { user } = use(AuthContext)
    const modalRef = useRef()
    const [id, setId] = useState(null)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

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

    const handleModal = (id) => {
        modalRef.current.showModal()
        setId(id)
    }

    const handleReview = (e) => {
        e.preventDefault()
        // console.log(id);
        // console.log(rating);

        const reviewData = {
            serviceId: id,
            userEmail: user.email,
            userName: user.displayName,
            rating,
            comment
        }
        // console.log(reviewData);
        instance.post('/reviews', reviewData)
            .then(res => {
                //    console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Thank you!",
                        text: "Your review has been submitted.",
                        icon: "success"
                    });
                    modalRef.current.close();
                    setRating(0);
                    setComment("");
                }
            })
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
                        <table className="table bg-base-300">
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
                                            <td className='flex items-center gap-4'>
                                                <button onClick={() => handleModal(service.service_id)} className='btn btn-xs text-green-800 outline outline-amber-300'>Review</button>
                                                <button onClick={() => handleCancel(service._id)} className='btn btn-xs text-green-600 outline outline-amber-500'>Cancel</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg text-center">Give your valuable ratings and reviews</h3>
                                <form onSubmit={handleReview}>
                                    <div className='my-5'>
                                        <div className='flex items-center gap-4'>
                                            <p className='font-medium text-xl'>Rating: </p>
                                            <Rating name="half-rating" value={rating} precision={0.5}
                                                onChange={(e, newValue) => setRating(newValue)}
                                            />
                                        </div>
                                        <textarea
                                            className='textarea textarea-bordered w-full my-3'
                                            placeholder='Write your review...'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button className='btn bg-amber-300'>Submit Review</button>
                                </form>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
            }
        </div>
    );
};

export default MyBookings;