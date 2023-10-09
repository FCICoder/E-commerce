import  { useState } from 'react'
// import style from './VerifyCode.module.css'
import { MagnifyingGlass } from 'react-loader-spinner';
import { useFormik } from 'formik';
import axios from 'axios';
import * as  Yup from 'yup' 
import { useNavigate } from 'react-router-dom';


export default function VerifyCode() {
  let [error,setError] = useState(null)
  let [isLoading , setisLoading]  = useState(false)
  let Navigate =useNavigate();

  let validateSchema = Yup.object({
    resetCode:Yup.string().required( ' Verfication Code is required'),
  })


  async function verifyCodeSubmit(values){
    setisLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
   .catch((err)=>{
    setError(err.response.data.message)
    setisLoading(false)
  })

 

  if(data.status === 'Success'){
    setisLoading(false);
    Navigate('/E-commerce/resetPassword');
  }
}
  const formik = useFormik({
    initialValues:{
      resetCode:'',
    },
    validationSchema:validateSchema,
    onSubmit:verifyCodeSubmit,
    
  })
 return <>
  <div className='w-75 mx-auto py-5'>
      {error ? <div className='alert alert-danger'>{error}</div>:""}
      
      <form onSubmit={formik.handleSubmit}>
      
      <label htmlFor="resetCode" >Code</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} className='form-control mb-2' type="string"  name='resetCode' id='resetCode'/>
      {formik.errors.resetCode && formik.touched.resetCode? <div className='alert alert-danger mt-2 p-2'>{formik.errors.resetCode}</div>:""}
      
      
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

