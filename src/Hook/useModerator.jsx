import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useModerator = () => {
    const {user,loader} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: isModerator, isPending:isModeratorLoading} = useQuery({
        queryKey:[ user?.email,'isModerator'],
        enabled:!loader,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/moderator/${user.email}`)
            console.log(res.data)
            return res.data?.moderator
        }
    })
    return [isModerator,isModeratorLoading];
};

export default useModerator;