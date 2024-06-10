import { update } from "firebase/database";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hook/useAxiosPublic";


const Register = () => {
    const {createEmail,update} = useAuth()
    const axiosPublic = useAxiosPublic()
 
    const navigate = useNavigate()

    const handleRegister = (e)=>{
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const photo = form.photo.value
        console.log(name,email,password,photo)

     
        createEmail(email,password,name,photo)
        .then((result)=>{
          console.log(result)
         
          update(name,photo)
          .then((result)=>{
            const userInfo = {
              name:name,
              email:email
                }
                axiosPublic.post('/users',userInfo)
                .then(res=>{
                 if(res.data.insertedId){
                  console.log('user added successfully')
                 
          
                 }})
         
          
      
         
           
          }
      
         )
          .catch()
          navigate('/login')
          toast.success('Registration Successful')
      
         })
        .catch((error)=>{
          console.error(error)
          toast.error('Registration Unsuccessful')
         
        })
  }
    return (
        <div className='flex justify-center items-center min-h-screen'>
        <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
          <div className='mb-8 text-center'>
            <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
            <p className='text-sm text-gray-400'>Welcome to Data-link</p>
          </div>
          <form
            onSubmit={handleRegister}
            noValidate=''
            action=''
            className='space-y-6 ng-untouched ng-pristine ng-valid'
          >
            <div className='space-y-4'>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Enter Your Name Here'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                  data-temp-mail-org='0'
                />
              </div>
              <div>
                <label htmlFor='photo' className='block mb-2 text-sm'>
                  Photo url:
                </label>
                <input
                  required
                  type='photo'
                  id='photo'
                  name='photo'
                  accept='photo/*'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                />
              </div>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm'>
                  Email address
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  required
                  placeholder='Enter Your Email Here'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                  data-temp-mail-org='0'
                />
              </div>
              <div>
                <div className='flex justify-between'>
                  <label htmlFor='password' className='text-sm mb-2'>
                    Password
                  </label>
                </div>
                <input
                  type='password'
                  name='password'
                  autoComplete='new-password'
                  id='password'
                  required
                  placeholder='*******'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                />
              </div>
            </div>
  
            <div>
              <button
                type='submit'
                className='bg-rose-500 w-full rounded-md py-3 text-white'
              >
            Register
              </button>
            </div>
          </form>
          <div className='flex items-center pt-4 space-x-1'>
            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
            <p className='px-3 text-sm dark:text-gray-400'>
              Signup with social accounts
            </p>
            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          </div>
          <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
            <FcGoogle size={32} />
  
            <p>Continue with Google</p>
          </div>
          <p className='px-6 text-sm text-center text-gray-400'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='hover:underline hover:text-rose-500 text-gray-600'
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    );
};

export default Register;