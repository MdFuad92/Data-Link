import { FaClipboardUser } from "react-icons/fa6";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { FaArrowAltCircleUp, FaArrowCircleUp, FaVoteYea } from "react-icons/fa";
import { useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAuth from "../../Hook/useAuth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";


const FeaturedProducts = ({ p, refetch }) => {
    const { name, vote, image, tags, timestamp, _id } = p
    const axiosPublic = useAxiosPublic()
  
    const [votes, setVotes] = useState(vote)
    const [isUpvote, setisUpvote] = useState(false)
    const {user} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()



 

    const handleUpvote = async () => {
       if(user ){
        const res = await axiosPublic.post(`/Products/${_id}/vote`)
        setVotes(res.data.vote)
        setisUpvote(true)
        refetch()

       }
       else{
        return navigate('/login')
       }
       
   
      
  
     
      
    } 

    return (
        <div className="grid grid-cols-1 mt-5 gap-5">

            <div className="bg-white border rounded-xl h-52 shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
                    <img className="size-52 absolute top-0 start-0 object-cover" src={image} alt="Image Description" />
                </div>
                <div className="flex flex-wrap">
                    <div className="p-4 flex flex-col h-full sm:p-7">
                        <span className="space-x-7 mb-3">
                           {tags.map(t=>
                            <span className="text-gray-400" key={t}>#{t}</span>
                           )}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {name}
                        </h3>
                        <p className="mt-1 text-gray-500 dark:text-neutral-400">
                            Some quick example text to build on the card title and make up the bulk of the cards content.
                        </p>
                        <div className="mt-5 sm:mt-auto flex justify-between">
                            <p className="text-xs text-gray-500 dark:text-neutral-500">
                              Posted on: {new Date(timestamp).toLocaleString()}
                            </p>
                            <div className="flex gap-2 items-center" >
                                <span>{vote}</span>
                                <button className="flex gap-1 items-center" onClick={handleUpvote}  disabled={isUpvote}>
                                   
                                    <FaArrowAltCircleUp    ></FaArrowAltCircleUp>
                                    Upvote
                                </button>
                            </div>

                        </div>



                    </div>
                </div>
            </div>


        </div>
    );
};

export default FeaturedProducts;