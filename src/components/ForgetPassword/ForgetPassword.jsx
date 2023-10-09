import  { useState } from 'react'
// import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import * as  Yup from 'yup' 
import { MagnifyingGlass } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function ForgetPassword() {
  let [error,setError] = useState(null)
  let [isLoading , setisLoading]  = useState(false)
  let Navigate =useNavigate();

  let validateSchema = Yup.object({
    email:Yup.string().email('is invalid email').required( 'email is required'),
    // password:Yup.string().matches(/^[A-z][a-z0-9]{5,10}$/, 'password is invalid start with upper case and min is 5 char').required('password is required'),
  })
  async function forgetPassSubmit(values){
    setisLoading(true)
    let { data } =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
   .catch((err)=>{
    setError(err.response.data.message)
    setisLoading(false)
  })
 

  if(data.statusMsg === 'success'){
    setisLoading(false);
    Navigate('/E-commerce/verfyCode');
  }
}
  const formik = useFormik({
    initialValues:{
      email:'',
    },
    validationSchema:validateSchema,
    onSubmit:forgetPassSubmit,
    
  })
 return <>
  <div className='w-75 mx-auto py-5'>
      {error ? <div className='alert alert-danger'>{error}</div>:""}
      
      <form onSubmit={formik.handleSubmit}>
      
      <label htmlFor="email" >E-mail</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' type="email"  name='email' id='email'/>
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>:""}
      
      
     {!isLoading? <div className='d-flex align-items-center justify-content-between' >
     
      <div className=' d-flex align-items-center '>
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-dark text-light   mt-2 mx-2 p-3'> Verify </button>
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
