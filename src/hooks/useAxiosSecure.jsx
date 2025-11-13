import axios from 'axios';
import { use, useEffect } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import { useNavigate } from 'react-router';

const instance = axios.create({
    baseURL: 'https://herohomeserver.vercel.app/'
})

export const useAxiosSecure = () => {
    const { user } = use(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const reqInterceptor = instance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user.accessToken}`
            return config
        })

        const resInterceptor = instance.interceptors.response.use((res) => {
            return res;
        }, (err) => {
            if (err.status === 401 || err.status === 403) {
                navigate('/error')
            }
        })

        return () => {
            instance.interceptors.request.eject(reqInterceptor)
            instance.interceptors.response.eject(resInterceptor)
        }

    }, [user, navigate])

    return instance;
}