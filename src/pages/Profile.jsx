import React, { use, useEffect, useState } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import userImg from '../assets/user.png'
import { toast } from 'react-toastify';
import Chart from '../components/Chart';
import { useAxiosSecure } from '../hooks/useAxiosSecure';
import Loader from '../components/Loader';

const Profile = () => {
    const { user, setUser, theme, updateUser } = use(AuthContext)
    const instance = useAxiosSecure()
    const [data, setData] = useState([])
    const [booked, setBooked] = useState([])
    const [myBooking, setMyBooking] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        instance.get(`/my-services?email=${user.email}`)
            .then(res => {
                setData(res.data);
                setLoading(false)
            })
    }, [instance, user])

    useEffect(() => {
        instance.get(`/my-stats?email=${user.email}`)
            .then(res => {
                setBooked(res.data);
                setLoading(false)
            })
    }, [instance, user])

    useEffect(() => {
        instance.get(`/booking?email=${user.email}`)
            .then(res => {
                setMyBooking(res.data);
                setLoading(false)
            })
    }, [instance, user])

    if (loading) {
       return <Loader/>
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        // console.log(name, photo);

        if (name.length < 2) {
            toast.error("Please enter a valid name");
            return;
        }

        updateUser({ displayName: name, photoURL: photo })
            .then(() => {
                setUser({ ...user, displayName: name, photoURL: photo })
                toast.success("Succesfully Update Profile !!")
            })
            .catch(err => {
                toast.error(err.code)
                setUser(user)
            })

        e.target.reset()
    }

    const totalRevenue = booked.reduce((sum, b) => sum + Number(b.price || 0), 0);

    // console.log(totalRevenue);
    // console.log(booked);

    return (
        <div className='w-11/12 mx-auto my-10'>
            <div className='grid lg:grid-cols-10 gap-5'>
                <div className='shadow lg:col-span-4'>
                    <img className={`mx-auto my-2 w-40 h-40 border-2 border-black/40 ${theme === 'dark' && 'border-white/40'} object-cover shadow rounded-full`} src={user.photoURL ? user.photoURL : userImg} alt="" />
                    <div className='my-6 text-center'>
                        <p className='font-medium'>Name: <span className={`text-black/70 ${theme === 'dark' && 'text-white/70'}`}>{user?.displayName}</span></p>
                        <p className='font-medium'>Email: <span className={`text-black/70 ${theme === 'dark' && 'text-white/70'}`}>{user?.email}</span></p>
                    </div>
                    <div className='divider'></div>
                    <p className='text-center font-semibold text-2xl my-4'>Update Your <span className='text-amber-300'>Profile</span></p>
                    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-md mb-4">
                        <div className="card-body">
                            <form onSubmit={handleUpdateProfile} className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" name='name' className="input" defaultValue={user?.displayName} />
                                <label className="label">Email</label>
                                <input type="email" name='email' className={`input text-black/70 ${theme === 'dark' && 'text-white/70'}`} defaultValue={user?.email} readOnly />
                                <label className="label">Image URL</label>
                                <input type="text" name='photo' className="input" defaultValue={user?.photoURL} placeholder='Photo URL' />
                                <button className="btn bg-amber-400 mt-4">Update Your Profile</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-6 shadow p-4'>
                    <h1 className='text-2xl font-bold mb-4'>Statistics</h1>
                    <div>
                        <div className='space-y-2 font-medium'>
                            <p>My Services : {data.length}</p>
                            <p>My Bookings : {myBooking.length}</p>
                            <p>People Booked My Services : {booked.length}</p>
                            <p>Total Revenue : {totalRevenue}$</p>
                        </div>
                        <div className='mt-8'>
                            <Chart data={data} booked={booked} myBooking={myBooking} totalRevenue={totalRevenue}></Chart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;