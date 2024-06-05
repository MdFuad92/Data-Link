

import { useQuery } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const ReportedProducts = () => {

    const axiosSecure = useAxiosSecure()
    
    const {data : reportedPost = [] , isPending, refetch } = useQuery({
        queryKey:['reportedPost'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/Products/report')
            return res.data
        }
    })

     if(isPending){
          
      return <span className="loading loading-spinner loading-xs"></span>
    
    
     }

    // hadnle delete
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
    
    
            axiosSecure.delete(`/Products/${id}`)
              .then(res => {
    
                if (res.data.deletedCount > 0) {
                  refetch()
                  toast.error('post has been removed')
    
                }
              })
          }
        });
      }


    return (
        <div className='overflow-x-auto w-1/2'>
              
         <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Product Name</span>
                      </div>
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Product Details</span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <span> Delete</span>
                    </th>

                 
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                
                      {
                         
                        reportedPost.map(r =>
                            <tr key={r._id} >
                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                             {r.name}
                            </td>
                            
                        
                         <td className=' hover:underline hover:cursor-pointer px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                         <Link to={`/productDetails/${r._id}` }>
                             View details
                             </Link>
                            </td>
                   
        
                         
                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                              <div className='flex items-center gap-x-2'>
                              <button className='btn' onClick={() => handleDelete(r._id)} >
                                <FaTrash></FaTrash>
                              </button>
                              </div>
                            </td>
                        
           
                          </tr>

                        )
                      }
                    
                 
                </tbody>
              </table>
            </div>
          </div> 
        </div>
    );
};

export default ReportedProducts;