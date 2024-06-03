import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useProducts = () => {
    const axiosPublic = useAxiosPublic()
    const url = '/Products'
    const { data: products = [], isPending, refetch } = useQuery({
        queryKey: '[Products]',
        queryFn: async () => {
            const res = await axiosPublic.get(url)
            return res.data

        }

    })
    return [products,isPending,refetch]
};

export default useProducts;