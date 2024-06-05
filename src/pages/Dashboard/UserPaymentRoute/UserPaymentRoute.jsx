import { loadStripe } from "@stripe/stripe-js";
import { MdClose } from "react-icons/md";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";






const UserPaymentRoute = ({closeModal,isOpen,refetch}) => {
      
    
    return (
        <div>
          <div className="relative flex justify-center">
      {isOpen && (
        <div
          className="fixed inset-0 z-10 modal-container"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex backdrop-blur-md items-end justify-center min-h-screen  pt-4  text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block text-left align-bottom transition-all transform border-gray-400 border  bg-white shadow-lg rounded-lg dark:bg-gray-900 w-[80%] md:w-[70%] lg:w-[40%] my-4 py-4 px-3 sm:align-middle">
             
                     <Payment refetch={refetch}></Payment>
     
              <div className="absolute top-0 right-0">
                <button
                  onClick={() => closeModal()}
                  className="text-3xl font-bold  text-black bg-white rounded-md hover:bg-base-300"
                >
              <MdClose className="text-sm"></MdClose>
                </button>
              </div>
              {/* form */}
            </div>
          </div>
        </div>
      )}
    </div>

        </div>
    );
};

export default UserPaymentRoute;