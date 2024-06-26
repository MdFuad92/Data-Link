
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
const EditCoupons = () => {

    const {_id,coupon_code, amount, coupon_description, expiry_date}  = useLoaderData()
    console.log(_id)
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit, } = useForm()

    const onSubmit = async (data) => {
        console.log(data)




        const couponsItem = {
            coupon_code: data.coupon_code,
            expiry_date: data.expiry_date,
            coupon_description: data.coupon_description,
            amount: data.amount,

        }

        const couponRes = await axiosSecure.put(`/coupon/${_id}`, couponsItem)
        console.log(couponRes.data)
        if (couponRes.data.modifiedCount > 0) {
            toast.success('Coupon updated successfully')

        }




    }
    return (
        <div className="space-y-10">
            <h3 className="font-extrabold text-zinc-800 text-lg my-5">Edit Coupon</h3>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="flex gap-2 mb-3 ">
                    <div className="max-w-sm">
                        <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Coupon Code</label>
                        <input type="text"  {...register("coupon_code")} defaultValue={coupon_code} id="input-label" className="py-3 px-4 block w-full border border-gray-00 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Add Coupon"  />
                    </div>
                    <div className="max-w-sm">
                        <label htmlFor="input-label"  className="block text-sm font-medium mb-2 dark:text-white">Expiry Date</label>
                        <input type="date" {...register("expiry_date")} defaultValue={expiry_date} id="input-label" className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Expiry Date"  />
                    </div>

                </div>

                <div className="flex form-control gap-2 mb-3 ">
                    <div className="w-full  space-y-3">
                        <textarea type='text' {...register("coupon_description")} defaultValue={coupon_description} className="py-3 px-4 block w-full border-gray-200 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows="3" placeholder="Coupon description" ></textarea>
                    </div>

                </div>
                <div className="w-full">
                    <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Discount Amount</label>
                    <input type="number" defaultValue={amount} {...register("amount")} id="input-label" className="py-3  border px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="you@site.com"  />
                </div>
                {/* submit button */}

                <button type="submit" className="mt-2 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" >
                   Submit
                </button>
            </form>
        </div>
    );
};

export default EditCoupons;