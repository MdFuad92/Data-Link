
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { HdrAuto } from "@mui/icons-material";
import toast from "react-hot-toast";


const ProductReviewQueue = () => {



    const axiosSecure = useAxiosSecure()


    const [pending, setPending] = useState('')
    const [accepted, setAccepted] = useState('')
    const [rejected, setRejected] = useState('')

    const { data: moderatorManageUser = [], isPending,refetch } = useQuery({
        queryKey: ['moderatorManageUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/postedProducts/sort')
            return res.data
        }
    })

    const handleAccept = (id) => {
        console.log(id)
        axiosSecure.patch(`/Products/${id}`)
            .then(res => {
                console.log(res.data)
                refetch() 
                toast.success('accepted')
            })

    }
    const handleReject = (id) => {
        console.log(id)
        axiosSecure.patch(`/Products/reject/${id}`)
            .then(res => {
                console.log(res.data)
                refetch()
                toast.error('rejected')
            })
    }






    const handleFeatured = async (id) => {
        console.log(id)
        await axiosSecure.put(`/featured/${id}`, { featured: 'featured' })
            .then(res => {
                console.log(res.data)
                refetch()
                toast.success('Post has been featured')
            })
    }




    if (isPending) {
        return <span className="loading loading-spinner loading-xs"></span>
    }


    return (
        <div>
            {/* sort */}

            <select className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">

                <option value='' >Status</option>
                <option value='pending' >Pending</option>
                <option value='accepted'>Accepted</option>
                <option value='rejected'>Rejected</option>

            </select>


            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Product Details</th>
                            <th>Status</th>
                            <th>Feature Post</th>
                            <th>Accept</th>
                            <th>Reject</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            moderatorManageUser.map((m, idx) =>


                                <tr key={m._id}>
                                    <th>{idx + 1}</th>
                                    <td>{m.name}</td>
                                    <td className=' hover:underline hover:cursor-pointer px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                        <Link to={`/productDetails/${m._id}`}>
                                            View details
                                        </Link>
                                    </td>

                                    <td>{m.status}</td>
                                    <td>{
                                        m.featured === 'featured'? 'Featured':<button onClick={() => handleFeatured(m._id)} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                        Feature
                                      </button>
                                        }</td>
                                    <td>
                                        {m.status === 'accepted' ? <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400" onClick={() => handleAccept(m._id)} disabled>Accept</button> :
                                            <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400" onClick={() => handleAccept(m._id)} >Accept</button>
                                        }
                                    </td>
                                    <td>

                                        {
                                            m.status === 'rejected'?<button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-100 text-red-800 hover:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400" onClick={() => handleReject(m._id)} disabled>Reject</button> : <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-100 text-red-800 hover:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400" onClick={() => handleReject(m._id)}>Reject</button>
                                        }
                                    </td>
                                </tr>


                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductReviewQueue;