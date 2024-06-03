import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useModerator from "../../Hook/useModerator";


const ModeratorRoute = ({children}) => {
    const {user,loader} = useAuth()
    const [isModerator,isModeratorLoading] = useModerator() 
    const location = useLocation()

    if(loader || isModeratorLoading ){
        return <div className=' w-full h-96 flex justify-center'>
            <span className=" loading loading-spinner loading-lg"></span>
        </div>
    }

    if(user || isModerator){
        return children
    }
    return <Navigate to='/login' state={{from:location}} replace ></Navigate>
};

export default ModeratorRoute;