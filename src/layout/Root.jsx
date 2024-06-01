import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Root = () => {
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
             {noHeaderFooter ||  <Navbar></Navbar>}
           <div className="min-h-[calc(100vh-92px)]" >
           <Outlet></Outlet>
           </div>
           {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Root;