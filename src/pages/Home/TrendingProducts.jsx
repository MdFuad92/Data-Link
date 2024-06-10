import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { debounce } from "lodash";
import { BsTriangleFill } from "react-icons/bs";


const TrendingProducts = ({ t, refetch }) => {


    const { name, vote, image, tags, timestamp, _id, owner_email,description } = t
    const axiosPublic = useAxiosPublic()

    const [votes, setVotes] = useState(vote)
    const [isUpvote, setisUpvote] = useState(false)
    const { user } = useAuth()
    const location = useLocation()
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
        <div >

            <div className="bg-white border rounded-xl h-[300px] shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
                    <img className="size-60 p-10 absolute top-0  start-0 object-cover" src={image} alt="Image Description" />
                </div>
                <div className="flex flex-wrap">
                    <div className="p-4 flex flex-col h-full sm:p-7">
                        <span className="space-x-7 mb-3">
                            {tags.map(t =>
                                <span className="text-gray-400" key={t}>#{t}</span>
                            )}
                        </span>
                        <Link to={`/productDetails/${_id}`}>
                            <h3 className="text-lg hover:underline hover:cursor-pointer font-bold text-gray-800 dark:text-white">
                                {name}
                            </h3>
                        </Link>
                        <p className="mt-1 text-gray-500 dark:text-neutral-400">
                            {description}
                        </p>
                        <div className="mt-5 sm:mt-auto flex justify-between">
                            <p className="text-xs text-gray-500 dark:text-neutral-500">
                                Posted on: {new Date(timestamp).toLocaleString()}
                            </p>
                            <div className="flex gap-2 items-center" >
                                <span>{vote}</span>
                                {
                                    owner_email === user?.email ?
                                        <button onClick={handleUpvote} className='btn bg-[#1565C0] btn-md  rounded-md text-white  ' disabled><BsTriangleFill className='text-lg text-white'></BsTriangleFill> Upvote </button> :
                                        <button onClick={handleUpvote} className='btn bg-[#1565C0] btn-md  rounded-md  text-white ' disabled={isUpvote}><BsTriangleFill className='text-lg text-white'></BsTriangleFill> Upvote </button>

                                }


                            </div>

                        </div>



                    </div>
                </div>
            </div>


        </div>
    );
};

export default TrendingProducts;