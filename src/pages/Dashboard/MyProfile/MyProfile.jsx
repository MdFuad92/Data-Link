import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useState } from "react";
import UserPaymentRoute from "../UserPaymentRoute/UserPaymentRoute";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../UserPaymentRoute/CheckoutForm";
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const MyProfile = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    // const { data: users, isPending, } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/users/${user?.email}`);
    //         return res.data
    //     }
    // })

    // if(isPending){
    //     return <span className="loading loading-spinner loading-xs"></span>   
    // }

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        document.body.classList.add("modal-open");
    };

    const closeModal = () => {
        setIsOpen(false);
        document.body.classList.remove("modal-open");
    };
     


    const { data: payments = {} ,isPending, refetch } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payments/${user?.email}`)
            return res.data
        }
    })
    const {name,email, status,price} = payments
    if(isPending){
       return <span className="loading loading-spinner loading-xs"></span>
    }

    return (
        <div>


            <div key={user._id} className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={user.photoURL} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-md">Name: {user.displayName}</h2>
                    <h2 className="card-title text-md">Email: {user.email}</h2>
                    <p></p>
                    <div className="card-actions justify-end">

                        <button onClick={openModal} className={status !== "verified" ? 'btn btn-error text-white': "btn hidden"}>Subscribe Button</button>
                        <UserPaymentRoute  refetch={refetch}  isOpen={isOpen} closeModal={closeModal} ></UserPaymentRoute>
                  
                            <div className="" >

                                <button  className={email === user.email? "btn btn-xs mr-3" : ' btn btn-xs hidden '}>
                                    {status}
                                </button>

                                <button className={email === user.email? "btn btn-xs mr-3" : ' btn btn-xs hidden '}>Paid: {price}$</button>

                            </div>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyProfile;