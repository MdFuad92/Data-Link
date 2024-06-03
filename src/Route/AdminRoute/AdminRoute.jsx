import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import useAuth from "../../Hook/useAuth";


const AdminRoute = ({children}) => {
     const {user,loader} = useAuth()
    const [isAdmin,isAdminLoading] = useAdmin() 
    const location = useLocation()

    if(loader || isAdminLoading ){
        return <div className=' w-full h-96 flex justify-center'>
            <span className=" loading loading-spinner loading-lg"></span>
        </div>
    }

    if(user || isAdmin){
        return children
    }
    return <Navigate to='/login' state={{from:location}} replace ></Navigate>
};

export default AdminRoute;