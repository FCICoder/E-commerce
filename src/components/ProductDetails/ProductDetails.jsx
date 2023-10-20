import { useContext} from 'react'
// import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import {Helmet} from 'react-helmet'
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1900,
  };

// let[proDetails,setProductDetails] = useState(null);
// useEffect(()=>{
//  getProductDetails(id)
// },[])
// ?------------------------------
let {addtoCart}= useContext(CartContext);

async function addProductToCart(id){
  let res = await addtoCart(id) 
  if(res.data.status === 'success' ){
    toast.success('product Successfully added',{
      duration:4000,
      
      iconTheme: {
        primary: '#09c',
        secondary: '#fff',
      },
    })
  }else{
    toast.error('Error Adding product ...!')
  }
}

let {id} =useParams();
async function getProductDetails(id){
  let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  return data;
}
 let {isLoading , isError , data}= useQuery('getProductDetails',()=>getProductDetails(id));
 let Info =data?.data.data;

return <>
        
  {Info?<div className='row g-5 bg-dark-subtle py-3 mt-5 align-items-center'>
        <Helmet>
            <title>{Info.title}</title>
        </Helmet>
    <div className="col-md-4">
    
        <Slider {...settings}>
         {Info.images.map((imag)=><img src={imag} className='w-100' alt={Info.title}/>)} 
        </Slider>
             
    </div>
    
    <div className="col-md-8  ">
      <h2>{Info.title}</h2>
      <p>{Info.description}</p>

      <h6 className='text-main fw-bold'>{Info.category.name}</h6>
      <h6 className='text-main fw-bold'>{Info.price} EGP</h6>
      <div className=' fw-bold d-flex justify-content-between'>
        <span> Rating Quantity: {Info.ratingsQuantity}</span>
        <span><i className='fas fa-star rating-color'></i>{Info.ratingsAverage}</span>
      </div>
      <button className='btn bg-main text-light w-100 my-2 fw-bold' onClick={()=>addProductToCart(Info.id)}>add to cart</button>
    </div>
  </div>:""}
  </>
}
