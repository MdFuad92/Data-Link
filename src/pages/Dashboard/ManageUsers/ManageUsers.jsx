import {  useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaUsers } from "react-icons/fa6";
import toast from "react-hot-toast";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {data : manageUsers = [],refetch} = useQuery({
        queryKey:['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    const handleMakeAdmin = (user) =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch()
                toast.success(`${user.name} is admin now`)
            }
        })
 
    }

    // moderator button
    const handleMakeModerator = (user) => {
      axiosSecure.patch(`/users/moderator/${user._id}`)
      .then(res =>{
        console.log(res.data)
        if(res.data.modifiedCount > 0){
          refetch()
          toast.success(`${user.name} is moderator now`)
        }
      })
    }

    return (
        <div>
           <div>

            </div> 

            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Make Admin</th>
        <th>Make Mod</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        manageUsers.map((m,idx)=>

            <tr key={m._id}>
            <th>{idx+1}</th>
            <td>{m.name}</td>
            <td>{m.email}</td>
            <td>
            {m.role === 'admin' ? "Admin" :
            <button onClick={() => handleMakeAdmin(m)} className="btn bg-[#ff6154] hover:bg-[#ff6154] hover:border-[#ff6154] btn-md">
            <FaUsers className="text-white text-2xl"></FaUsers>
            </button>
             }
            </td>
            <td>
            {m.role === 'moderator' ? "Moderator" :
            <button onClick={() => handleMakeModerator(m)} className="btn bg-[#ff6154] hover:bg-[#ff6154] hover:border-[#ff6154] btn-md">
            <FaUsers className="text-white text-2xl"></FaUsers>
            </button>
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

export default ManageUsers;