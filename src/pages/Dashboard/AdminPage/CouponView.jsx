import { useLoaderData } from "react-router-dom";


const CouponView = () => {

    const {_id,coupon_code,amount,coupon_description,expiry_date} = useLoaderData()
    console.log(_id,)

    
     

    return (
        <div>
            <div className ="my-10 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <h3 className ="text-lg font-bold text-gray-800 dark:text-white">
                {coupon_code}
                </h3>
                <p className ="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-neutral-500">
                    Amount: {amount}%
                </p>
                <p className ="mt-2 text-gray-500 dark:text-neutral-400">
                    {coupon_description}
                </p>
                <a className ="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400" href="#">
                  Expiry Date: {expiry_date}
                    <svg className ="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default CouponView;