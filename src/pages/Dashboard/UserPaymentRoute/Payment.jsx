import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = ({refetch}) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm refetch={refetch} />
            </Elements>
        </div>
    );
};

export default Payment;