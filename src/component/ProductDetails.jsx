
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useLoaderData, useLocation, useNavigate, } from 'react-router-dom';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import useAxiosPublic from '../Hook/useAxiosPublic';
import { useState } from 'react';
import useAuth from '../Hook/useAuth';
import useProducts from '../Hook/useProducts';
import { axiosSecure } from '../Hook/useAxiosSecure';
import toast from 'react-hot-toast';
import { MdArrowDropDown, MdReportProblem } from 'react-icons/md';
import { BsTriangle, BsTriangleFill } from 'react-icons/bs';

const ProductDetails = () => {
    const { name, vote, image, tags, timestamp, _id, description,link } = useLoaderData()


    const axiosPublic = useAxiosPublic()
    const [refetch] = useProducts()
    const [votes, setVotes] = useState(vote)
    const [isUpvote, setisUpvote] = useState(false)
    const { user } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

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



    return (
        <div className='border border-gray-300 h-96'>
            <div className=' p-5 flex justify-evenly items-center'>
                <div >
                    <img className='btn btn-circle' src={image} alt="" />
                    <h2 className='text-lg'>{name}</h2>
                    <p className='text-sm text-gray-400'>{description}</p>
                </div>

                <div className='flex gap-3 items-center'>
                    <div className="dropdown mr-3">
                        <div tabIndex={0} role="button" className="btn m-1"><MdArrowDropDown className='text-lg'> </MdArrowDropDown> Visit Link</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                         <li> <a href={link}>{name}</a> </li>  
                          
                        </ul>
                    </div>
                    <span className='flex gap-3 items-center'>{vote} </span>
                    <button onClick={handleUpvote} className='btn bg-[#ff5d59]  rounded-md ' disabled={isUpvote}><BsTriangleFill className='text-lg text-white'></BsTriangleFill> Upvote </button>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;