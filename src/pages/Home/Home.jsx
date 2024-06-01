import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Home = () => {
    const axiosPublic = useAxiosPublic()
    const url = '/Products'

    const { data:products ,isPending,refetch } = useQuery({
        queryKey: ['Products'],

        queryFn: async () => {
            const res = await axiosPublic.get(url)
            return res.data

        }
    })

    if (isPending) {
        return <span className="loading loading-spinner loading-xs"></span>
        

    }

    return (
        <div>
        <Banner></Banner>
        {
          products.map(p=>
            <FeaturedProducts refetch={refetch} key={p._id} p={p}></FeaturedProducts>
          ) 
        }
        </div>
    );
};

export default Home;