import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useAuth from '../../../Hook/useAuth';
import useProducts from '../../../Hook/useProducts';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyProduct = () => {
   const axiosSecure = useAxiosSecure()
   const {user} = useAuth()

    const {data : usersPost = [], isPending,refetch} = useQuery({
        queryKey:['postedProducts'],
        queryFn:async() =>{
            const res = await axiosSecure.get(`/userproducts/${user?.email}`)
            return res.data
        }
    })
   
    if(isPending){
       return <span className="loading loading-spinner loading-xs"></span>
    }
    const handleDelete = id => {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
  
  
          axiosSecure.delete(`/userproduct/${id}`)
            .then(res => {
  
              if (res.data.deletedCount > 0) {
                refetch()
                toast.error('post has been deleted')
  
              }
            })
        }
      });
    }

    return (
        <div>
          <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Product Name</th>
        <th>Vote</th>
        <th>Status</th>
        <th>Update</th>

      </tr>
    </thead>
    <tbody>
           {/* row 1 */}
    
          
    {
      usersPost.map((u,idx)=> 
        <tr key={u._id} >
        <th>{idx+1}</th>
        <td>{u.name}</td>
        <td>{u.vote}</td>
        <td>
        <Link to={`/dashboard/updateProducts/${u._id}`}>
        <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400">
            Update
        </button></Link>
       </td>
        <td><button onClick={() => handleDelete(u._id)} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400">
           Delete
          </button></td>
        
      </tr>
      )
    }
       
    
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyProduct;