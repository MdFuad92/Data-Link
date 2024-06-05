import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useAuth from '../../../Hook/useAuth';
import useProducts from '../../../Hook/useProducts';

const MyProduct = () => {
   const axiosSecure = useAxiosSecure()
   const {user} = useAuth()

    const {data : usersPost = [], isPending} = useQuery({
        queryKey:['postedProducts'],
        queryFn:async() =>{
            const res = await axiosSecure.get(`/Products/${user?.email}`)
            return res.data
        }
    })
   
    if(isPending){
       return <span className="loading loading-spinner loading-xs"></span>
    }


    return (
        <div>
          <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
           {/* row 1 */}
     {
        usersPost?.map((u,idx)=>
          
      <tr key={u._id}>
      <th>{idx+1}</th>
      <td>{u.name}</td>
      <td>Quality Control Specialist</td>
      <td>Blue</td>
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