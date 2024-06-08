
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, setRef } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure, { axiosSecure } from '../../Hook/useAxiosSecure';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import useProducts from '../../Hook/useProducts';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect, useState } from 'react';
import { Await } from 'react-router-dom';
import { result } from 'lodash';
import PageviewIcon from '@mui/icons-material/Pageview';




const Products = () => {


  const [jobs, setJobs] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [filter, setFilter] = useState("");
  
  // const [tags, setTags] = useState('')

  // const [click, setisClicked] = useState(false)
  // const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()





  useEffect(() => {
    AOS.init();
  }, [])

  



  const handleSearch = (e) => {
    e.preventDefault()
    console.log(e.target.search.value)
    setFilter(e.target.search.value)

  }



  useEffect(() => {
    axiosPublic.get(`/pagination?page=${currentPage}&size=${itemsPerPage}&filter=${filter}`
    ).then((res) => {
      setJobs(res.data)
    });
  }, [axiosPublic,currentPage, itemsPerPage,filter]);

 useEffect(() => {
    axiosPublic.get('/count').then((res) =>
      setCount(res.data.count)
    );
  }, [axiosPublic]);



  console.log(count)
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((el) => el + 1);


  const handlePaginationBtn = (value) => {
    setCurrentPage(value);
  };





  return (
    <div>
      
       {/* pagination */}
       <div className="flex justify-center mt-12">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationBtn(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {/* pagination section  */}

        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationBtn(btnNum)}
            key={btnNum}
            className={`hidden px-4 py-2 ${
              currentPage === btnNum ? "bg-blue-500 text-white" : ""
            } mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationBtn(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
         
      

        
        <div className='text-start mb-10'>
       <form onSubmit={handleSearch} >

       <input name='search' className='input input-bordered mr-3' placeholder='Search'  type="text" />
       <Button  variant='contained' type='submit' ><PageviewIcon></PageviewIcon></Button>
       
       </form>
        </div>
        <div className='mb-10'>
          <h1 className='text-2xl'>Check Out Amazing products posted </h1>
        </div>
     
      <div className='md:grid grid-cols-3 gap-5' data-aos="fade-up" data-aos-duration='1000'>
        {



     

            jobs?.map(a => a.status === 'accepted' ?
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
    </div>
  );
};

export default Products;