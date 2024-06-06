
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";


const ProductReviewQueue = () => {

    const { _id } = useLoaderData()
    const [posts, setPosts] = useState([]);

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    useEffect( ()=>{
        axiosSecure.get(`/Manageuser/${user.email}`)
        .then(res=>{
            setPosts(res.data)
        })


    })

    const updateStatus = (id, status) => {
        axiosSecure.put(`/userproduct/${id}`, { status })
            .then(response => {
                const updatedPost = response.data;
                setPosts(posts.map(post => post._id === id ? updatedPost : post));
                toast.success('successful')
            })
            .catch(error => console.error('Error updating post:', error));
    };







    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Product Details</th>
                            <th>Status</th>
                   
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                         posts.map((m, idx) =>


                                <tr key={m._id}>
                                    <th>{idx + 1}</th>
                                    <td>{m.name}n</td>
                                    <td className=' hover:underline hover:cursor-pointer px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                        <Link to={`/productDetails/${m._id}`}>
                                            View details
                                        </Link>
                                    </td>
                                    <td>  <button onClick={() => updateStatus(m._id, 'featured')}>Feature</button>
                         
       
                            </td>
                            <td>
                            <button onClick={() => updateStatus(m._id, 'accepted')}>Accept</button>
                            </td>
                            <td>
                            <button onClick={() => updateStatus(m._id, 'rejected')}>Reject</button>
                            </td>
                               
                                    <td>{m.status}</td>
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