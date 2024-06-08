import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure, { axiosSecure } from '../../Hook/useAxiosSecure';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import useProducts from '../../Hook/useProducts';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles



const Products = () => {
  const [products, isPending] = useProducts()

  React.useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div className='md:grid grid-cols-3 gap-5' data-aos="fade-up" data-aos-duration='1000'>

      {
        products.map(a => a.status === 'accepted' ?
          <div key={a._id} className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="p-4 md:p-5">
              <img className='btn btn-circle' src={a.image} alt="" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {a.name}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-neutral-400">
                {a.description}
              </p>
              <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" href="#">
                {a.tags.map(t =>
                  <span className="text-gray-400" key={t}>#{t}</span>
                )}
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </a>
            </div>
            <div className="bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                {new Date(a.timestamp).toLocaleString()}
              </p>
            </div>
          </div> : ''
        )
      }
    </div>
  );
};

export default Products;