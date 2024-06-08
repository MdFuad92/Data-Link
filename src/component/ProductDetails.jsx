

import { useLoaderData, useLocation, useNavigate, } from 'react-router-dom';
import { } from 'react-icons/fa';
import useAxiosPublic from '../Hook/useAxiosPublic';
import { useState } from 'react';
import useAuth from '../Hook/useAuth';
import useProducts from '../Hook/useProducts';
import useAxiosSecure, { axiosSecure } from '../Hook/useAxiosSecure';
import toast from 'react-hot-toast';
import { Controller, useForm } from "react-hook-form"
import { MdArrowDropDown, MdStarBorder, } from 'react-icons/md';
import { BsTriangleFill } from 'react-icons/bs';
import * as React from 'react';

import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


const ProductDetails = () => {

    const { name, vote, image, tags, timestamp, _id, description, link } = useLoaderData()


    const axiosPublic = useAxiosPublic()
    const [isPending,refetch] = useProducts()
    const [votes, setVotes] = useState(vote)
    const [isUpvote, setisUpvote] = useState(false)
    const { user } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    

    const handleReport = async () => {
        axiosPublic.post(`/Products/${_id}/report`)
            .then(res => {
                if (res.data.report) {
                    toast.success('this post is reported')
                }
            })
    }

    const handleUpvote = async () => {

        const res = await axiosSecure.post(`/Products/${_id}/vote`)
        setVotes(res.data.vote)
        setisUpvote(true)
        refetch()
    }

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            rating: 2
        }
    })
    
    const onSubmit = async(data) => {
    console.log(data)
    const userReview = {
        productId: _id, 
        reviewer_name : data.reviewer_name,
        reviewer_image : data.reviewer_image,
        rating: data.rating,
        review_description: data.review_description


    }
    await axiosSecure.post('/reviews/',userReview)
    .then(res=>{
        console.log(res.data)
        if(res.data.insertedId){
            toast.success('Thanks for your feedback')
        }
    })
    
    }
     
    const [review,setReview] = useState([])
    axiosSecure.get(`/reviews/${_id}`)
    .then(res =>{
        
        setReview(res.data)
        
    })


    





    return (
        <div className='border h-full border-gray-300 '>
            <div className=' p-5 md:flex md:flex-row flex-col justify-evenly items-center '>
                <div >
                    <div className='mb-9'>
                        <img className='btn btn-circle' src={image} alt="" />
                        <h2 className='text-lg'>{name}</h2>

                        <p className='mt-3'>Posted on: {new Date(timestamp).toLocaleString()}</p>
                    </div>
                    <p className='text-sm text-gray-400 md:w-[550px]'>{description}</p>
                    <div className='space-x-4'>
                        {tags.map(t =>
                            <span className="text-gray-400" key={t}>#{t}</span>
                        )}
                        <button onClick={handleReport} className='btn btn-xs btn-outline btn-error text-white'>Report</button>
                    </div>
                </div>

                <div className='flex  gap-3 items-center md:mt-0 mt-5'>
                    <div className="dropdown mr-3">
                        <div tabIndex={0} role="button" className="btn m-1"><MdArrowDropDown className='md:text-lg'> </MdArrowDropDown> Visit Link</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li> <a href={link}>{name}</a> </li>

                        </ul>
                    </div>
                    <span className='flex gap-3 items-center'>{vote} </span>
                    <button onClick={handleUpvote} className='btn bg-[#ff5d59]  rounded-md ' disabled={isUpvote}><BsTriangleFill className='text-lg text-white'></BsTriangleFill> Upvote </button>

                </div>

            </div>

          {/* review form */}
         
            <div className='md:ml-40 mt-10'>
            <h1 className='text-lg font-semibold text'>Give your feedback</h1>
                <form onSubmit={handleSubmit(onSubmit)}>


                    <div className='flex gap-6'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Reviwer Name</span>
                            </div>
                            <input type="name" {...register("reviewer_name")} defaultValue={user?.displayName} placeholder="Reviewer Name" className="input input-bordered w-full max-w-xs" readOnly />

                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Reviewer Image</span>
                            </div>
                            <input type="photo" {...register("reviewer_image")} defaultValue={user?.photoURL} placeholder="Reviewer Image" className="input input-bordered w-full max-w-xs" readOnly />

                        </label>
                    </div>
                    {/* rating */}
                    <div>
                        <label className="form-control ">
                            <div className="label">
                                <span className="label-text">Rating</span>

                            </div>
                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <Typography component="legend">Rating</Typography>
                                <Controller
                                  name='rating'
                                  control={control}
                                  render={({field}) =>(

                                    <Rating
                                      {...field}
                                      onChange={(event,newValue) =>{
                                        field.onChange(newValue)
                                      }}
                                    />
                                  )}


                                    />
                                </Box>
                        </label>
                    </div>
                    {/* description */}
                    <div>
                        <label className="form-control md:w-4/5">
                            <div className="label">
                                <span className="label-text">Give us a feedback</span>

                            </div>
                            <textarea {...register("review_description")}  className="textarea textarea-bordered h-24" placeholder="Your feedback"></textarea>

                        </label>
                    </div>
                    <button className='btn btn-error text-white my-4 '>Submit</button>
                </form>

                
            </div>
               {/* user reviews */}
           
               <div className='border  p-6 mb-3 max-w-screen-md md:ml-40' >
                <h1 className='text-xl mb-5'>Customer Reviews</h1>
               {
                review.map(r=>
                    <div className='p-5' key={r._id}>
                    <div className='flex items-center gap-4'>
                    <img className='btn btn-circle' src={r.reviewer_image} alt="" />
                    <h1 className='text-start text-lg'>{r.reviewer_name}</h1>
                    </div>
                      {/* des */}
                      <div className='flex justify-between'>
                      <p className='text-start' >{r.review_description}</p>
                      <div  className='flex items-center '>
                      <MdStarBorder className='text-lg text-yellow-300'></MdStarBorder>
                      <span> {r.rating} </span>
                       
                      </div>
                      </div>
                    <hr className='mt-5' />
                    </div>
                )
               }
               </div>

        </div>
    );
};

export default ProductDetails;