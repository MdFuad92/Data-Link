import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { BsCloudFog, BsDatabaseDash, BsFillHouseAddFill, BsGraphUp, BsPerson, BsPersonCheck, BsPersonCircle } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { MdHomeWork, MdProductionQuantityLimits, MdReport, MdReviews } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import logo1 from '../assets/6397599.jpg'
import { FaPersonRifle, FaProductHunt, FaTencentWeibo } from "react-icons/fa6";
import { BiSolidCartAdd, BiSolidCoupon } from "react-icons/bi";
import useAdmin from "../Hook/useAdmin";
import useModerator from "../Hook/useModerator";


const Dashboard = () => {
    const { logOut } = useAuth()
    // TODO: admin get from the database
    const [isAdmin] = useAdmin()
    const [isModerator] = useModerator()
    const [isActive, setActive] = useState(false)
    const navigate = useNavigate()
    const handlelogOut = () =>{
        logOut()
        .then(navigate('/'))
        .catch()
    }

    // Sidebar Responsive Handler
    const handleToggle = () => {
      setActive(!isActive)
    }
    return (
        <>
        
        {/* Small Screen Navbar */}
        <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
          <div>
            <div className='block cursor-pointer p-4 font-bold'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src={logo1}
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div>
          </div>
  
          <button
            onClick={handleToggle}
            className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
          >
            <AiOutlineBars className='h-5 w-5' />
          </button>
        </div>
  
        {/* Sidebar */}
        <div
          className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#7e909a] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
            isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
        >
          <div >
            
            <div>
              <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-white mx-auto'>
                <Link to='/'>
                  <img
                    // className='hidden md:block'
                    src={logo1}
                    alt='logo'
                    width='100'
                    height='100'
                  />
                </Link>
              </div>
            </div>
  
            {/* Nav Items */}
            <div className='flex flex-col justify-between flex-1 mt-6'>
              {/* Conditional toggle button here.. */}
              {/* profile */}
              {/*  Menu Items */}
              <nav>
             
                {
                    isAdmin?<>

                  <NavLink
                  to='/dashboard/manageusers'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <BsPersonCircle className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>Manage Users</span>
                </NavLink>
  
                {/* Add product */}
                <NavLink
                  to='/dashboard/statistics'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                 <BsGraphUp className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>Statistics</span>
                </NavLink>
                {/* My my product */}
                <NavLink
                  to='/dashboard/manageCoupons'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <BiSolidCoupon className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>Manage Coupons</span>
                </NavLink>
                    
                    </> :
                    isModerator?<>
                         <NavLink
                  to='/dashboard/productReviewQueue'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <MdReviews className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>Product Review Queue</span>
                </NavLink>
  
                {/* Add product */}
                <NavLink
                  to='/dashboard/reportedContents'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <MdReport className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>Reported Contents</span>
                </NavLink>
              
               
                    </>
                    
                    :
                    <> 
                       {/* my profile */}
                     <NavLink
                  to='/dashboard/myprofile'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <BsPerson className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>My Profile</span>
                </NavLink>
  
                {/* Add product */}
                <NavLink
                  to='/dashboard/addproduct'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <MdProductionQuantityLimits className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>Add Product</span>
                </NavLink>
                {/* My my product */}
                <NavLink
                  to='/dashboard/myproduct'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <BsCloudFog className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>My Product</span>
                </NavLink>
                    </>
                }
              </nav>
            </div>
          </div>
  
          <div>
            <hr />
  
            {/* Profile Menu */}
            <NavLink
              to='/dashboard/profile'
              className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                  isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                }`
              }
            >
              <FcSettings className='w-5 h-5' />
  
              <span className='mx-4 font-medium'>Profile</span>
            </NavLink>
            <button
              onClick={handlelogOut}
              className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
            >
              <GrLogout className='w-5 h-5' />
  
              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
          
        </div>
        <div className="flex justify-center" >
            <Outlet></Outlet>
          </div>
      </>
    );
};

export default Dashboard;