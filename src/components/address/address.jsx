import { useContext } from 'react'
// import style from './Address.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../context/CartContext'
export default function Address() {
  
  let {onlinePayment , cartId} = useContext(CartContext) ;

async function handleAddSubmet(values){
 let response = await  onlinePayment(cartId,'http://localhost:5173',values);
 console.log(response?.data);
 window.location.href = response?.data.session.url;
} 

let formik = useFormik({
  initialValues:{
    details:'',
    phone:'',
    city:''
  },
  onSubmit:handleAddSubmet
})
return <>
  <div className="container">
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor="details">Datails</label>
      <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" 
      className='form-control mb-2' name='details' id='details'  />
     
        <label htmlFor="city">City</label>
      <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" 
      className='form-control mb-2' name='city' id='city'  />

      <label htmlFor="phone">Phone</label>
      <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" 
      className='form-control mb-2' name='phone' id='phone'/>
    
      <button className='btn bg-main 'type='submit'>Pay Now</button>
    </form>
  </div>
  </>
}
