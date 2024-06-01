
import {
    createBrowserRouter,

} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Login from "../Authenticate/Login";
import Register from "../Authenticate/Register";
import Products from "../pages/Products/Products";
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
]);

export default router;