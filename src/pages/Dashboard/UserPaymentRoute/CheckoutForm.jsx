import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";





const CheckoutForm = ({closeModal,isOpen,refetch}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [transactionId, setTransactionId] = useState('')
    const [error, setError] = useState('')
    const axiosSecure = useAxiosSecure('')
    const [clientSecret, setClientSecret] = useState('')

    const { user } = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
   
          axiosSecure.post('/create-payment-intent', { price: 60 })
          .then((res) => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
          })

        }, [axiosSecure])

        const handleSubmit = async (e) => {
            e.preventDefault()
            if (!stripe || !elements) {
              return;
            }
        
            const card = elements.getElement(CardElement)
        
            if (card === null) {
              return;
            }
        
            const { error, paymentMethod } = await stripe.createPaymentMethod({
        
              type: 'card',
              card,
            })
        
            if (error) {
              console.log('payment error', error)
              setError(error.message)
            }
            else {
              console.log('payment method', paymentMethod)
              setError('')
            }
            // confirm payment
        
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: card,
                billing_details: {
                  email: user?.email || 'anonymous',
                  name: user?.displayName || 'anonymous'
                }
              }
            })
            if (confirmError) {
              console.log('error')
            }
            else {
              console.log(paymentIntent)
              if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)
                //  payment saving in database
                const payment = {
                  email: user?.email,
                  price: 60,
                  transactionId: paymentIntent.id,
                  status: 'verified'
                 
               
              
        
        
                }
        
                const res = await axiosSecure.post('/payments',payment)
                   console.log(res.data) 
                  
                   if(res.data?.resultPayment?.insertedId){
                    toast.success('Payment Successful')
                    navigate('/dashboard/myprofile')
                    refetch()
                   }
              }
            }
          }

    return (
        <div>

          

       

        <form onSubmit={handleSubmit} >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button className="btn btn-success my-4" type="submit" disabled={!stripe || !clientSecret}>
            Pay
          </button>
          <p className="text-xl text-red-600">{error}</p>
          {transactionId && <p className="text-green-600">Your Transaction Id: {transactionId}</p>}
  
        </form>
        
      </div>
    );
};

export default CheckoutForm;