import React, { use } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import { useAxios } from './../hooks/useAxios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddServices = () => {
    const { user } = use(AuthContext)
    const instance = useAxios()
    const navigate = useNavigate()

    const handleAddService = (e) => {
        e.preventDefault()
        const serviceName = e.target.service.value;
        const category = e.target.category.value;
        const price = e.target.price.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const location = e.target.location.value;
        const image = e.target.image.value;
        const desc = e.target.desc.value;

        const newService = {
            serviceName,
            category,
            providerName: name,
            providerEmail: email,
            ratePerHour: price,
            location,
            description: desc,
            image,
            rating: null
        }
        // console.log(newService);

        instance.post('/services', newService)
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    e.target.reset()
                    navigate('/services')
                }

            })
    }

    return (
        <div className='w-11/12 mx-auto my-10'>
            <h1 className='font-bold text-2xl md:text-3xl text-center my-6'>Add <span className='text-amber-300'> Service </span></h1>
            <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto'>
                <form onSubmit={handleAddService} className='card-body'>
                    <label className="label">Service Name</label>
                    <input type="text" name='service' required className="input" placeholder="Service name" />
                    <label className="label">Category</label>
                    <select defaultValue="Category" name='category' className="select appearance-none">
                        <option disabled={true}>Select a category</option>
                        <option>Home Improvement</option>
                        <option>Technical</option>
                        <option>Repairs & Maintenance</option>
                        <option>Gardening & Yard</option>
                        <option>Cleaning</option>
                    </select>
                    <label className="label">Price</label>
                    <input type="number" name='price' required className="input" placeholder="Price Per Hour" />
                    <label className="label">Provider Name</label>
                    <input type="text" name='name' readOnly className="input" defaultValue={user?.displayName} />
                    <label className="label">Provider Email</label>
                    <input type="email" name='email' readOnly className="input" defaultValue={user?.email} />
                    <label className="label">Location</label>
                    <input type="text" name='location' required className="input" placeholder="Location" />
                    <label className="label">Image</label>
                    <input type="text" name='image' required className="input" placeholder="Image" />
                    <label className="label">Description</label>
                    <input type="text" name='desc' required className="input" placeholder="Description" />
                    <button className='btn bg-amber-300'>Create A Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddServices;