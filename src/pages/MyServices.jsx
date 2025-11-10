import React, { useRef } from 'react';
import { use } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAxios } from './../hooks/useAxios';
import Swal from 'sweetalert2';

const MyServices = () => {
    const { user } = use(AuthContext)
    const instance = useAxios()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const modalRef = useRef()
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        instance.get(`/my-services?email=${user.email}`)
            .then(res => {
                setData(res.data);
                setLoading(false)
            })
    }, [instance, user])

    const handleDelete = (id) => {
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
                instance.delete(`/my-services/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            const remainingData = data.filter(service => service._id !== id)
                            setData(remainingData)
                        }
                    })
            }
        });
    }

    const handleModal = (service) => {
        modalRef.current.showModal()
        setSelectedService(service)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const serviceName = e.target.service.value;
        const category = e.target.category.value;
        const price = e.target.price.value;
        const location = e.target.location.value;
        const image = e.target.image.value;
        const desc = e.target.desc.value;

        const upService = {
            serviceName,
            category,
            ratePerHour: price,
            location,
            description: desc,
            image,
        }
        console.log(upService);
        // console.log(selectedService._id);

        instance.patch(`/my-services/${selectedService._id}`, upService)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    modalRef.current.close()
                }
            })
    }

    if (loading) {
        return <p className='my-20 text-3xl font-bold text-center'>Loading...</p>
    }

    return (
        <div className='w-11/12 mx-auto my-10'>
            <h1 className='font-bold text-2xl md:text-3xl text-center my-6'>My <span className='text-amber-300'> Services </span></h1>
            {
                data.length === 0 ? <p className='text-2xl my-10 text-center font-bold'>Currently you don't have any <span className='text-amber-300'>services</span></p> :
                    <div className='my-20 overflow-x-auto'>
                        <table className="table border border-black/10 bg-white">
                            <thead>
                                <tr>
                                    <th>SL No.</th>
                                    <th>Service Name</th>
                                    <th>Provider Name</th>
                                    <th>Provider Email</th>
                                    <th>Service Price</th>
                                    <th>Rating</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((service, i) =>
                                        <tr key={service._id}>
                                            <th>{i + 1}</th>
                                            <td>{service.serviceName}</td>
                                            <td>{service.providerName}</td>
                                            <td>{service.providerEmail}</td>
                                            <td className='font-bold'>${service.ratePerHour}</td>
                                            <td className='font-bold'>{service.rating === null ? "--" : service.rating}</td>
                                            <td className='space-x-4'>
                                                <button onClick={() => handleModal(service)} className='btn btn-xs text-green-600 outline outline-amber-500'>Update</button>
                                                <button onClick={() => handleDelete(service._id)} className='btn btn-xs text-red-600 outline outline-red-500'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            }
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-center">Update Your Service</h3>
                    {selectedService && (
                        <div key={selectedService._id} className="my-3 card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow">
                            <div className="card-body">
                                <form onSubmit={handleUpdate} className="fieldset">
                                    <label className="label">Service Name</label>
                                    <input type="text" name='service' required defaultValue={selectedService.serviceName} className="input" />

                                    <label className="label">Category</label>
                                    <select defaultValue={selectedService.category} name='category' className="select appearance-none">
                                        <option disabled>Select a category</option>
                                        <option>Home Improvement</option>
                                        <option>Technical</option>
                                        <option>Repairs & Maintenance</option>
                                        <option>Gardening & Yard</option>
                                        <option>Cleaning</option>
                                    </select>

                                    <label className="label">Price</label>
                                    <input type="number" name='price' required defaultValue={selectedService.ratePerHour} className="input" />

                                    <label className="label">Location</label>
                                    <input type="text" name='location' required defaultValue={selectedService.location} className="input" />

                                    <label className="label">Image</label>
                                    <input type="text" name='image' required defaultValue={selectedService.image} className="input" />

                                    <label className="label">Description</label>
                                    <input type="text" name='desc' required defaultValue={selectedService.description} className="input" />

                                    <button className="btn bg-amber-300 mt-3">Update Now</button>
                                </form>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyServices;