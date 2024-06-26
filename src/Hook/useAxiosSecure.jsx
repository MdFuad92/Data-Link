import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

export const axiosSecure = axios.create({
    baseURL: 'https://assignment-twelve-server-omega.vercel.app'
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logOut} = useAuth()
    axiosSecure.interceptors.request.use(function (config){
        const token = localStorage.getItem('access-token')
        // console.log('request hit by interceptors')
        config.headers.authorization = `Bearer ${token}`
        return config
    },function (error){
        return Promise.reject(error)
    })

    // intercepts 401 and 403 status

    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        const status = error.response.status
        // console.log('status error', status)

        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')
            
        }
        return Promise.reject(error)
    }
    )
    return axiosSecure;
};

export default useAxiosSecure;