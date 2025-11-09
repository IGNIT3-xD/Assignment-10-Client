import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, Link } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [showPass, setShowPass] = useState(true)
    const { loginUser, setUser, googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);

        loginUser(email, password)
            .then((result) => {
                // console.log(result.user);
                setUser(result.user)
                toast.success("Login Successfull !!")
                navigate(location.state || '/')
            })
            .catch(err => toast.error(err.code))
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                setUser(result.user)
                toast.success("Login Successfull !!")
            })
            .catch(err => toast.error(err.code))
    }

    const handleShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div>
            <div className="my-10 card mx-auto border border-white/50 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <p className='text-center font-bold text-2xl mt-6'><span className='text-amber-300'>Login</span> Now !!</p>
                <div className="card-body">
                    <form onSubmit={handleLogin} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" required name='email' className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <div className='relative'>
                            <input type={showPass ? "password" : "text"} required name='password' className="input" placeholder="Password" />
                            <span onClick={handleShowPass} className='absolute right-8 top-3.5 cursor-pointer'>{showPass ? <FaEyeSlash className='h-4 w-4' />
                                : <FaEye className='h-4 w-4' />}</span>
                        </div>
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn bg-amber-400 mt-4">Login</button>
                    </form>
                    <div className='divider'>Or</div>
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <p className='mt-4'>Didn't have an account? <Link to={'/auth/registration'} className='text-amber-300 hover:underline'>Registration Now!!</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;