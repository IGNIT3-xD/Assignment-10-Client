import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://herohomeserver.vercel.app/'
})

export const useAxios = () => {
    return instance
}