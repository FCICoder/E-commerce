import  { useContext, useState } from 'react'
// import style from './Login.module.css'
import {useFormik} from 'formik'
import * as  Yup from 'yup' 
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
// import Login from '../Login/Login'
import { MagnifyingGlass } from 'react-loader-spinner'
import { userContext } from '../../context/UserContext'


export default function Login() {
  let { setUserToken , setUserData}  =useContext(userContext);  
  let Navigate =useNavigate();
  let [error,setError] = useState(null)
  let [isLoading , setisLoading]  = useState(false)

  async function loginSubmit(values){
    setisLoading(true)
    let { data } =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
   .catch((err)=>{
    setError(err.response.data.message)
    setisLoading(false)
  })

   if(data.message === 'success'){
    setisLoading(false);
    localStorage.setItem('userToken',data.token);
    setUserToken(data.token)
    setUserData(data.user)
    Navigate('/home');
  }
  }


  let validateSchema = Yup.object({
    email:Yup.string().email('is invalid name').required( 'email is required'),
    password:Yup.string().matches(/^[A-z][a-z0-9]{5,10}$/, 'password is invalid start with upper case and min is 5 char').required('password is required'),
  })
  
  

  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:validateSchema,
    onSubmit:loginSubmit,
    
  })

  return <>
    <div className='w-75 mx-auto py-5'>
      {error ? <div className='alert alert-danger'>{error}</div>:""}
      <h3>Login Now</h3>
      <form onSubmit={formik.handleSubmit}>
      
      <label htmlFor="email" >E-mail</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' type="email"  name='email' id='email'/>
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>:""}
      
      <label htmlFor="password" >Password</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2' type="password"  name='password' id='password'/>
      {formik.errors.password && formik.touched.password? <div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div>:""}
      
     {!isLoading? <div className='d-flex align-items-center justify-content-between' >
     
      <Link className='btn fw-bolder fs-5' to={'/register'}>Register Now</Link>
      <div className=' border border-0 rounded text-light d-flex align-items-center '>
      <Link className='btn fs-6 fw-bolder' to={'/forgotPassword'}>Forget Password</Link>
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2 mx-2'> Login </button>
     </div>
     </div>
     
      :<button  type='button' className='btn bg-main text-white mt-2'>  
          <MagnifyingGlass
            visible={true}
            height="20"
            width="40"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = '#c0efff'
            color = '#e15b64'
          />
       </button>}
    </form>
    </div>
    
  </>
}
