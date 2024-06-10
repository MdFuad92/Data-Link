import { Link, useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const ManageCoupons = () => {


    const axiosSecure = useAxiosSecure()
    const { data: table = {}, isPending } = useQuery({
        queryKey: ['table'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupon')
            return res.data
        }
    })
    const { _id, coupon_code, coupon_description, expiry_date, amount } = table
    console.log(_id)

    if (isPending) {
        return <span className="loading loading-spinner loading-xs"></span>
    }
    return (
        <div>

            {/* add edit view */}
            <div className="inline-flex ml-16 md:ml-0 rounded-lg shadow-sm my-10 ">

                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                    <Link to={'/dashboard/addCoupon'}> Add</Link>
                </button>

                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                  
                </button>

                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                    edit
                </button>
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                    delete
                </button>
            </div>
            {/*  */}
            <div className="flex flex-col w-80 md:w-full ">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border overflow-hidden dark:border-neutral-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-500  dark:text-neutral-500">Coupon Code</th>
                                        <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Amount</th>
                                        <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Expiry Date</th>
                                        <th scope="col" className="px-3 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Description</th>
                                        <th scope="col" className="px-3 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">View Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">

                                    {
                                         table.map(t=>
                                            <tr key={t._id} >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{t.coupon_code} </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{t.amount} </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{t.expiry_date}</td>
          
                                            <td className="px-6 py-4 w-10 whitespace-nowrap text-end text-sm font-medium">
                                             {t.coupon_description}
                                            </td>
                                            <Link to={`/dashboard/couponView/${t._id}`}>   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">View</td></Link>
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