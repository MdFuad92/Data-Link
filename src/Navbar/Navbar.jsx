import { useEffect, useState } from "react";
import logo from '../assets/6397599.jpg'
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { CiUser } from "react-icons/ci";
import useAdmin from "../Hook/useAdmin";
import useModerator from "../Hook/useModerator";

const Navbar = () => {
    const [state, setState] = useState(false)
    const { user, logOut } = useAuth()
    const [isAdmin] = useAdmin()
    const [isModerator] = useModerator()

    const handlelogOut = () => {
        logOut()
            .then()
            .catch()
    }

    // Replace javascript:void(0) paths with your paths
    const links = <>
        <li ><NavLink className={({ isActive }) => isActive ? 'text-[#1565C0]' : 'font-normal'} to='/'><span className="hover:text-[#1565C0] hover:duration-500  ">Home</span></NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? 'text-[#1565C0]' : 'font-normal'} to='/products'><span className="hover:text-[#1565C0] hover:duration-500  ">Products</span></NavLink></li>





    </>

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, [])
    return (
        <nav className={`bg-white pb-5 md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <a href="javascript:void(0)">
                        <img
                            src={logo}
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                    </a>
                    <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-[gray-800]"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {links}
                    </ul>
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        {
                            user ?
                                <div className="dropdown dropdown-end ">
                                    <div tabIndex={0} role="button" className="btn  btn-circle avatar  tooltip tooltip-neutral  tooltip-left" data-tip={user.displayName}>
                                        <div className="w-12 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={user.photoURL || <CiUser />} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3  p-2 menu menu-sm dropdown-content bg-white rounded-sm w-52 z-50">
                                        <li className='hover:bg-neutral hover:text-[#ff6154] rounded-lg '><a className='text-sm'><span className='text-lg'>Hi,</span>{user.displayName}!</a></li>
                                        {user &&  isAdmin && <li>
                                            <Link to={'/dashboard/statistics'}>
                                                <a className="justify-between">
                                                    Dashboard
                                                </a>

                                            </Link>
                                        </li>}
                                        {user &&  isModerator && <li>
                                            <Link to={'/dashboard/productReviewQueue'}>
                                                <a className="justify-between">
                                                    Dashboard
                                                </a>

                                            </Link>
                                        </li>}
                                        {user && !isModerator && !isAdmin && <li>
                                            <Link to={'/dashboard/myprofile'}>
                                                <a className="justify-between">
                                                    Dashboard
                                                </a>

                                            </Link>
                                        </li>}
                                        <li onClick={handlelogOut}><a>Logout</a></li>
                                    </ul>

                                </div> :
                                <>
                                    <Link to={'/login'}>
                                        <button href="javascript:void(0)" className="block text-gray-700 hover:text-[#1565C0]">
                                            Log in
                                        </button>
                                    </Link>
                                    <Link to={'/register'}>
                                        <button href="javascript:void(0)" className="flex items-center justify-center gap-x-1 py-2 px-4 text-[#1565C0] font-medium bg-gray-200 hover:border-[#1565C0] hover:border active:border-[#1565C0] rounded-full md:inline-flex">
                                            Sign up
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Link>
                                </>
                        }


                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;