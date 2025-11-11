import React, { use, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAxios } from '../hooks/useAxios';
import { useEffect } from 'react';
import { FaRegStar } from "react-icons/fa";
import { AuthContext } from './../contexts/AuthContext';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const instance = useAxios()
    const modalRef = useRef()
    const navigate = useNavigate()
    const { user, theme } = use(AuthContext)
    const [revData, setRevData] = useState([])

    useEffect(() => {
        instance.get(`services/${id}`)
            .then(res => {
                // console.log(res.data);
                setData(res.data)
                setLoading(false)
            })
    }, [instance, id])

    useEffect(() => {
        instance.get(`/reviews/${id}`)
            .then(res => {
                setRevData(res.data)
            })
    }, [id, instance])

    const handleBook = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const price = e.target.price.value;
        const date = e.target.date.value;

        const selectedDate = new Date(date)
        const todaysDate = new Date()

        selectedDate.setHours(0, 0, 0, 0)
        todaysDate.setHours(0, 0, 0, 0)

        setError(false)
        if (selectedDate <= todaysDate) {
            // toast.error('Please Select A Future Date For Booking Services')
            setError(true)
            return
        }

        const book = {
            customer_name: name,
            customer_email: email,
            customer_phone: phone,
            customer_address: address,
            service_id: data._id,
            service_name: data.serviceName,
            provider_email: data.providerEmail,
            price,
            date
        }
        // console.log(book);

        instance.post('/booking', book)
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    modalRef.current.close()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your booking has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    if (loading) {
        return <p className='my-20 text-3xl font-bold text-center'>Loading...</p>
    }

    return (
        <div className='my-10 w-11/12 mx-auto'>
            <div className='flex flex-col lg:flex-row gap-8 shadow p-4'>
                <figure className={`p-2 border border-black/5 ${theme === 'dark' && 'border-white/20'} rounded-sm`}>
                    <img className='mx-auto object-contain h-full rounded-sm md:w-full lg:w-96' src={data?.image} alt="" />
                </figure>
                <div className='flex-1'>
                    <p className='text-2xl font-bold'>{data?.serviceName}</p>
                    <p className={`text-black/60 ${theme === 'dark' && 'text-white/60'} mt-3`}>{data?.description}</p>
                    <div className="divider"></div>
                    <p className='font-semibold'>Provider: <span className={`text-black/70 ${theme === 'dark' && 'text-white/70'}`}>{data?.providerName}</span></p>
                    <p className='font-semibold'>Provider Email: <span className={`text-black/70 ${theme === 'dark' && 'text-white/70'}`}>{data?.providerEmail}</span></p>
                    <p className='font-semibold'>Location: <span className={`text-black/70 ${theme === 'dark' && 'text-white/70'}`}>{data?.location}</span></p>
                    <div className="divider"></div>
                    <div className=''>
                        <p className='font-semibold flex items-center'>
                            <span>Rating: <span className='m-1 text-amber-300'>{data?.rating}</span></span>
                            <FaRegStar className='text-amber-300' />
                        </p>
                        <p className='badge badge-warning mt-3'>{data?.category}</p>
                    </div>
                    <div className="divider"></div>
                    <p className='text-xl font-bold'>Price: <span className='text-amber-300'>${data?.ratePerHour}</span> / hour</p>
                    <button disabled={user?.email === data?.providerEmail} onClick={() => modalRef.current.showModal()} className='btn bg-amber-400 mt-3'>Book Now</button>
                    <button onClick={() => navigate(-1)} className='btn bg-amber-500 mt-3 ml-3'>← Go Back</button>
                    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-2xl text-center">Book Our Service Now !!</h3>
                            <div className="my-3 card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow">
                                <div className="card-body">
                                    <form onSubmit={handleBook} className="fieldset">
                                        <label className="label">Name</label>
                                        <input type="text" name='name' defaultValue={user.displayName} readOnly className={`input text-black/80 ${theme === 'dark' && 'text-white/80'}`} />
                                        <label className="label">Email</label>
                                        <input type="email" name='email' defaultValue={user.email} readOnly className={`input text-black/80 ${theme === 'dark' && 'text-white/80'}`} />
                                        <label className="label">Phone No.</label>
                                        <input type="number" required name='phone' className="input" placeholder='Phone No.' />
                                        <label className="label">Address</label>
                                        <input type="text" required name='address' className="input" placeholder='Address' />
                                        <label className="label">Price / Hour ($)</label>
                                        <input type="number" readOnly name='price' defaultValue={data?.ratePerHour} className={`input text-black/80 ${theme === 'dark' && 'text-white/80'}`} />
                                        <label className="label">Booking Date</label>
                                        <input type="date" required name='date' className="input" />
                                        {error && <p className='text-red-600 my-3 font-medium'>⚠ Please Select A Future Date For Booking Services</p>}
                                        <button className="btn bg-amber-300">Book Now</button>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            <h1 className='text-2xl font-bold mt-10 text-center'>Reviews</h1>
            <div className='overflow-x-auto mb-10 mt-6'>
                {
                    revData.length === 0 ? <p className='text-2xl font-bold text-center'>No <span className='text-amber-300'>Reviews</span> Yet</p> :
                        <table className={`table border border-base-200 bg-base-200`}>
                            <thead>
                                <tr>
                                    <th>SL No.</th>
                                    <th>User Name</th>
                                    <th>User Email</th>
                                    <th>Comment</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    revData.map((user, i) =>
                                        <tr key={user._id}>
                                            <th>{i + 1}</th>
                                            <td>{user?.userName}</td>
                                            <td>{user?.userEmail}</td>
                                            <td>{user?.comment}</td>
                                            <td>{user?.rating}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    );
};


export default ServiceDetails;