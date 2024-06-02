
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
        ]
    },
    
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
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
            //  aadmin routes
            {
                path:'manageusers',
                element:<ManageUsers></ManageUsers>
            }
        ]
    }
]);

export default router;