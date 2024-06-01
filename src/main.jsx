import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {


  RouterProvider,
} from "react-router-dom";

import router from './Route/Router.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


// Create a client
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <QueryClientProvider client={queryClient}>
     <AuthProvider>
     <div className='max-w-screen-xl mx-auto'>
    <RouterProvider router={router} />
     </div>
    </AuthProvider>
 </QueryClientProvider>
  </React.StrictMode>,
)
