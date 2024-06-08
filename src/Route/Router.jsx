
import {
    createBrowserRouter,

} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Login from "../Authenticate/Login";
import Register from "../Authenticate/Register";
import Products from "../pages/Products/Products";
import Dashboard from "../layout/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";
import MyProduct from "../pages/Dashboard/MyProduct/MyProduct";
import PrivateRoute from "../Route/PrivateRoute/PrivateRoute"

import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import Statistics from "../pages/Dashboard/Statistics/Statistics";
import AdminRoute from "./AdminRoute/AdminRoute";
import ModeratorRoute from "./ModeratorRoute/ModeratorRoute";
import ManageCoupons from "../pages/Dashboard/ManageCoupons/ManageCoupons";


import ProductDetails from "../component/ProductDetails";
import ReportedProducts from "../pages/Dashboard/ModeratorSection/ReportedProducts";
import UpdateProducts from "../pages/Dashboard/UpdateProducts/UpdateProducts";
import ProductReviewQueue from "../pages/Dashboard/ModeratorSection/ProductReviewQueue";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
           {
            path:'/',
            element:<Home></Home>
           },
           {
            path:'/products',
            element:<Products></Products>
           },
           {
            path:'/login',
            element:<Login></Login>
           },
           {
            path:'/register',
            element:<Register></Register>
           },
           {
            path:'/productDetails/:id',
            element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
            loader:({params})=>fetch(`http://localhost:5000/Products/${params.id}`)

           }
        ]
    },
    
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            // user routes
            {
                path:'myprofile',
                element:<MyProfile></MyProfile>

            },
            {
                path:'addproduct',
                element:<AddProduct></AddProduct>
            },
            {
                path:'myproduct',
                element:<MyProduct></MyProduct>
            },
            {
                path:'updateProducts/:id',
                element:<UpdateProducts></UpdateProducts>,
                loader:({params})=>fetch(`http://localhost:5000/userproduct/${params.id}`)
            },

            // moderator routes
            {
                path:'productReviewQueue',
                element:<ModeratorRoute><ProductReviewQueue></ProductReviewQueue></ModeratorRoute>,
       
             
               
            },
            {
                path:'reportedContents',
                element:<ModeratorRoute><ReportedProducts></ReportedProducts></ModeratorRoute>
            },
            //  aadmin routes
            {
                path:'manageusers',
                element:<PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
            },
            {
                path:'statistics',
                element:<PrivateRoute><AdminRoute><Statistics></Statistics></AdminRoute></PrivateRoute>
            },
            {
                path:'manageCoupons',
                element:<PrivateRoute><AdminRoute><ManageCoupons></ManageCoupons></AdminRoute></PrivateRoute>

            }
        ]
    }
]);

export default router;