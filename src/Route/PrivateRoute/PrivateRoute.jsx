import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hook/useAuth";


const PrivateRoute = ({children}) => {
    const {user,loader} = useAuth()
    const location = useLocation()

    if(loader){
        return <div className=' w-full h-96 flex justify-center'>
            <span className=" loading loading-spinner loading-lg"></span>
        </div>
    }

    if(user){
        return children
    }
    return <Navigate to='/login' state={{from:location}} replace ></Navigate>
};

export default PrivateRoute;