import { BsTriangleFill } from "react-icons/bs";
import useAuth from "../../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useProducts from "../../Hook/useProducts";
import useAxiosPublic from "../../Hook/useAxiosPublic";


const Cards = ({ a }) => {


    const { _id, owner_email, description, name, tags, timestamp, image, vote } = a
    const [votes, setVotes] = useState(vote)
    const [isUpvote, setisUpvote] = useState(false)
    const { user } = useAuth()
    const [refetch] = useProducts()
    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate()





    const handleUpvote = async () => {
        if (user) {
            const res = await axiosPublic.post(`/Products/${_id}/vote`)
            setVotes(res.data.vote)
            setisUpvote(true)
            refetch()

        }
        else {
            return navigate('/login')
        }






    }




    return (
       
            <div className=" bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="px-6 py-4">
                    <img className='btn btn-circle' src={image} alt="" />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {name}
                    </h3>
                    <div>
                        <p className="mt-2 text-gray-500 dark:text-neutral-400">
                            {description}
                        </p>
                        <p className=" flex justify-end items-center gap-4 text-gray-500 dark:text-neutral-400">
                            <span>{vote}</span>
                            {
                                owner_email === user?.email ?
                                    <button onClick={handleUpvote} className='btn bg-[#1565C0] btn-md text-white  rounded-md ' disabled><BsTriangleFill className='text-lg text-white'></BsTriangleFill> Upvote </button> :
                                    <button onClick={handleUpvote} className='btn bg-[#1565C0] btn-md  rounded-md text-white ' disabled={isUpvote}><BsTriangleFill className='text-lg text-white'></BsTriangleFill> Upvote </button>

                            }
                        </p>
                    </div>
                    <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" href="#">
                        {tags.map(t =>
                            <span className="text-gray-400" key={t}>#{t}</span>
                        )}
                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </a>
                </div>
                <div className="bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                        {new Date(timestamp).toLocaleString()}
                    </p>
                </div>
            </div>
        
    );
};

export default Cards;