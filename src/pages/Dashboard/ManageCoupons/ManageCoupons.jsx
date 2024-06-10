import { Link, useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const ManageCoupons = () => {


    const axiosSecure = useAxiosSecure()
    const { data: table = {}, isPending, refetch } = useQuery({
        queryKey: ['table'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupon')
            return res.data
        }
    })


    if (isPending) {
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


                axiosSecure.delete(`/coupon/${id}`)
                    .then(res => {

                        if (res.data.deletedCount > 0) {
                            refetch()
                            toast.error('Coupon has been removed')

                        }
                    })
            }
        });
    }
    return (
        <div>
            <div className="inline-flex rounded-lg shadow-sm my-10 ">
                <Link to={'/dashboard/addCoupon'}> 
                <button type="button" className= "hover:bg-[#1565C0] hover:text-white py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                   Add Coupon
                </button></Link>
            </div>

            <div className="flex flex-col w-80 md:w-[800px] ">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border overflow-hidden dark:border-neutral-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6  py-3 text-start text-xs font-medium text-gray-500  dark:text-neutral-500">Coupon Code</th>
                                        <th scope="col" className="px-6  py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Amount</th>
                                        <th scope="col" className=" px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Expiry Date</th>
                                        <th scope="col" className="px-6  py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Description</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">View Details</th>
                                        <th scope="col" className="px-6  py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Edit</th>
                                        <th scope="col" className="px-6  py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Delete Coupon</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">

                                    {
                                        table.map(t =>
                                            <tr key={t._id} >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{t.coupon_code} </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{t.amount} </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{t.expiry_date}</td>

                                                <td className="px-6 py-4 w-14 whitespace-nowrap text-end text-sm font-medium">
                                                    {t.coupon_description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 hover:underline hover:cursor-pointer">   <Link to={`/dashboard/couponView/${t._id}`}>View
                                                </Link></td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 hover:cursor-pointer"> <Link to={`/dashboard/editCoupons/${t._id}`}><FaEdit></FaEdit>    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    <button onClick={() => handleDelete(t._id)} className="btn">
                                                        <FaTrash></FaTrash>
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCoupons;