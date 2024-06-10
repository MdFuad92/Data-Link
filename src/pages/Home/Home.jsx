import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TrendingProducts from "./TrendingProducts";
import useProducts from "../../Hook/useProducts";
import { Link } from "react-router-dom";
import HeaderText from "./HeaderText";
import CouponCarousel from "./CouponCarousel";


const Home = () => {

    const [products, isPending, refetch] = useProducts()



    const [sortProduct, setsortedProducts] = useState([])
    const [sortVote, setSortedVote] = useState([])

    useEffect(() => {
        if (products.length) {
            setsortedProducts(products)
            setSortedVote(products)
        }
    }, [products])

    if (isPending) {
        return <span className="loading loading-spinner loading-xs"></span>
    }






    const handleDescend = (descend) => {
        if (descend === 'timestamp') {
            const sortedproducts = products.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            console.log(sortedproducts)
            setsortedProducts(sortedproducts)


        }
    }

    const handleAscend = (ascend) => {
        if (ascend === 'timestamp') {
            const sortedproducts = products.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            console.log(sortedproducts)
            setsortedProducts(sortedproducts)


        }

    }

    const handleVoteSort = (descend) => {
        if (descend === 'vote') {
            const voteCount = products.slice().sort((a, b) => b.vote - a.vote)
            setSortedVote(voteCount)
        }
    }
    const handleVoteAscend = (ascend) => {
        if (ascend === 'vote') {
            const voteCount = products.slice().sort((a, b) => a.vote - b.vote)
            setSortedVote(voteCount)
        }
    }




    return (
        <div>
            <div >

                <Banner className='mb-10'></Banner>
            </div>

            <div className="bg-slate-100 text-start p-5 mt-10">
                <h2 className="text-3xl   ">Welcome to Data-link</h2>
                <p className=" text-lg">The place to launch and discover new tech products.Take a tour.</p>
            </div>
            <div className="flex items-center justify-between mt-5 mb-5" >
                <h3 className="md:text-3xl">Featured products launching today</h3>


                <details className="dropdown">
                    <summary className="m-1 btn">See Posts</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32">
                        <li onClick={() => { handleDescend('timestamp') }} ><a>Latest Post</a></li>
                        <li onClick={() => { handleAscend('timestamp') }} ><a>Oldest Post</a></li>
                    </ul>
                </details>

                {/* <p className="hover:text-orange-500" >All</p> */}

            </div>

            <hr />
            <div className="grid grid-cols-1 mt-24 gap-5">
                {
                    sortProduct.map(p => p.featured === 'featured' ?
                        <FeaturedProducts refetch={refetch} key={p._id} p={p}></FeaturedProducts> : ''
                    )
                }
            </div>

            <div className="flex justify-between items-center md:mt-20 mt-60 mb-5" >
                <h3 className="md:text-3xl">Trending products launching today</h3>
                <div className="flex gap-4">
                    <details className="dropdown">
                        <summary className="m-1 btn">Votes</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] text-xs bg-base-100 rounded-box md:w-32 w-20">
                            <li onClick={() => { handleVoteSort('vote') }} ><a>Highest Vote</a></li>
                            <li onClick={() => { handleVoteAscend('vote') }} ><a>Lowest Vote</a></li>
                        </ul>
                    </details>

                </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 mt-5 gap-5">
                {
                    sortVote.map(t =>
                        <TrendingProducts refetch={refetch} key={t._id} t={t}></TrendingProducts>
                    )
                }
            </div>
            {/* button */}
            <div className="text-center md:mt-5 mt-60">
                <Link to={'/products'}>
                    <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1565C0] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Show All
                    </button>
                </Link>
            </div>

            {/*coupon carousel */}
            <div className="mt-5">
                <CouponCarousel></CouponCarousel>
            </div>



        </div>
    );
};

export default Home;