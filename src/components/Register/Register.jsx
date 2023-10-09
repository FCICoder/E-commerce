import { useContext, useState } from 'react'
// import style from './Register.module.css'
import {useFormik} from 'formik'
import * as  Yup from 'yup' 
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import { MagnifyingGlass } from 'react-loader-spinner'
import { userContext } from '../../context/UserContext'


export default function Register() {
  let { setUserToken , setUserData } = useContext(userContext)
  let Navigate =useNavigate();
  let [error,setError] = useState(null)
  let [isLoading , setisLoading]  = useState(false)

  async function submetRegister(values){
    setisLoading(true)
    let { data } =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
   .catch((err)=>{
    setError(err.response.data.message)
    setisLoading(false)
  })
   if(data.message === 'success'){
    localStorage.setItem('userToken',data.token);
    setUserToken(data.token)
    setUserData(data.user)
    setisLoading(false)
    Navigate('/E-commerce/')
  }
  }

  let phoneRegex= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let validateSchema = Yup.object({
    name:Yup.string().min(3 , 'name min length is 3').max(10 , 'name max length is 10 ').required('name is required'),
    email:Yup.string().email('is invalid name').required( 'email is required'),
    phone:Yup.string().matches(phoneRegex,'phone number is in valid').required('phone is required'),
    password:Yup.string().matches(/^[A-z][a-z0-9]{5,10}$/, 'password is invalid start with upper case and min is 5 char').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref("password")],' password and repassword dont match').required('rePassword is required'),
  })
  
  // function validate(values){
  //   console.log(values)
  //   let errors={};
  //   if(!values.name){
  //     errors.name='name is required'
      
  //   }else if(values.name.length<3){

  //     errors.name = 'name min length is 3'
  //   }else if(values.name>10){

  //     errors.name = 'name max length is 10'
  //   }
  //   if(!values.phone){
  //     errors.phone= 'phone is required'
  //   }
  // log
  // }


  const formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },
    validationSchema:validateSchema,
    onSubmit:submetRegister,
    
  })

  return <>
    <div className='w-75 mx-auto py-5'>
      {error ? <div className='alert alert-danger'>{error}</div>:""}
      <h3>Register Now</h3>
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name" >Name</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='form-control mb-2' type="text"  name='name' id='name'/>
      {formik.errors.name && formik.touched.name? <div className='alert alert-danger mt-2 p-2'>{formik.errors.name}</div>:""}

      <label htmlFor="email" >E-mail</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' type="email"  name='email' id='email'/>
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>:""}
      
      <label htmlFor="phone" >Phone</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-2' type="tel"  name='phone' id='phone'/>
      {formik.errors.phone && formik.touched.phone? <div className='alert alert-danger mt-2 p-2'>{formik.errors.phone}</div>:""}
      
      <label htmlFor="password" >Password</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2' type="password"  name='password' id='password'/>
      {formik.errors.password && formik.touched.password? <div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div>:""}
      
      <label htmlFor="rePassword" >rePassword</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control mb-2' type="password"  name='rePassword' id='rePassword'/>
      {formik.errors.rePassword && formik.touched.rePassword? <div className='alert alert-danger mt-2 p-2'>{formik.errors.rePassword}</div>:""}
      
     {!isLoading? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'> Register  </button>
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
