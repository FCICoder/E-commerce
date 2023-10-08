import  { useContext, useEffect, useState } from 'react'
// import style from './FeaturedProducts.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { ColorRing } from 'react-loader-spinner';
import {Link} from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../../context/wishListContext';




export default function FeaturedProducts() {

  
//  let  [products,setProducts] = useState([]);
//  const [isLoading , setisLoading] = useState(false);

//   async function getFeaturedProducts(){
//     setisLoading(true);
//     let{data} = await axios.get(`https:ecommerce.routemisr.com/api/v1/products`)
//     setProducts(data.data);
//     setisLoading(false);
//   }

  // useEffect(()=>{
  //   getFeaturedProducts();
  // })
let {addtoCart} = useContext(CartContext)
let {addtoWishList, getloggedwishlist, setflage2 , flag2 , flager ,removeProduct}=useContext(wishListContext)
let [wishdata , setWishdata] = useState(null);

async function addToWishList(prodId){
  let res = await addtoWishList(prodId) 

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
async function removeFromWishList(prodId){
  let res = await removeProduct(prodId) 
 
  if(res.data.status === 'success' ){
    toast.success('product Successfully removed',{
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
  async function getFeaturedProducts(){
    getLoggedWishList()
   
    return axios.get(`https:ecommerce.routemisr.com/api/v1/products `);

  }
  let { isLoading , isError , data , isFetching  , }  = useQuery('featuredProducts', getFeaturedProducts ,{
    cacheTime:5000,
    refetchOnMount:false,
    staleTime:30000,
    refetchInterval:5000,
    // enabled:=true
    
  });


  async function getLoggedWishList(){
    let{data} = await getloggedwishlist()
  
    setWishdata(data);   
    setflage2(true);  
    wishdata.map((prd)=>{
      prd.isFavorite=true;
    })
  }
  let arr = wishdata?.data;
  
  let info = data?.data.data;
  info?.map(prods=>{
    arr?.map(prd=>{
      if(prd.id == prods.id){
        prods.isFavorite=true;
      }
    })
  })
  let i;
  let [newInfo2,setNewInfo2]=useState('')
let [newInfo,setNewInfo]=useState([])
   function listProducts(e) {
   
      setNewInfo2(e.target.value)
      i =info?.filter((prod)=>{
        
      if(prod?.title.toLowerCase().includes(newInfo2)){
       setNewInfo(prod);
        return prod
      }      
      
    })
    
    setNewInfo(i)
  }

  useEffect(()=>{
    
  },[newInfo2])
  
  return <>
  
  {isLoading?
  <div className=' w-100 bg-dark bg-opacity-50 py-5 d-flex justify-content-center align-items-center' style={{height:500}}>
  <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
  </div>:
  
  <div className=" container py-2">
    {/* <button className='btn bg-main text-white w-100' onClick={refetch}> get products</button> */}
    <div className="row g-0">
    {/* <input type="text" className='form-control' onChange={(e)=>listProducts(e)}  />  */}
      {/* {
       newInfo.length > 0 && newInfo2 != '' ?         
       newInfo?.map((products) =>  <div key={products.id} className="col-md-3  shadow">
       <div className='fw-bold product p-3  cursor-pointer bg-light'>
       <Link to={`./ProductDetails/${products.id}`}>
         <img className='w-100' src={products.imageCover} alt={products.title} />
         <span className='text-main font-sm fw-bolder'>{products.category.name}</span>
         <p className='' style={{fontSize:10}}>{products.title.split(" ").splice(0,2).join(" ")}</p>

         <div className='d-flex justify-content-between mt-3 bgj '>
           <span style={{fontSize:18}}  >{products.price} EGP</span>
           <span><i className='fas fa-star rating-color'></i> {products.ratingsAverage}</span>
         </div>
         </Link>   
         <button className='btn bg-main text-white w-100 btn-sm mt-2 mb-2' onClick={()=>addProductToCart(products.id)}>add to cart</button>
         {
           products?.isFavorite?<i key={products.id} className="fa-solid fa-heart fa-2xl "   style={{color: "#d02525",}}  onClick={()=>removeFromWishList(products.id)}></i> 
           :
           <i key={products.id} className="fa-solid fa-heart fa-2xl"   onClick={()=>addToWishList(products.id)}></i>

         }
      
          </div>

     </div>)
      : */}

     { info?.map((products)=> <div key={products.id} className="col-md-3  shadow">
        <div className='fw-bold product p-3  cursor-pointer bg-light'>
        <Link to={`./ProductDetails/${products.id}`}>
          <img className='w-100' src={products.imageCover} alt={products.title} />
          <span className='text-main font-sm fw-bolder'>{products.category.name}</span>
          <p className='' style={{fontSize:10}}>{products.title.split(" ").splice(0,2).join(" ")}</p>

          <div className='d-flex justify-content-between mt-3 bgj '>
            <span style={{fontSize:18}}  >{products.price} EGP</span>
            <span><i className='fas fa-star rating-color'></i> {products.ratingsAverage}</span>
          </div>
          </Link>   
          <button className='btn bg-main text-white w-100 btn-sm mt-2 mb-2' onClick={()=>addProductToCart(products.id)}>add to cart</button>
          {
            products?.isFavorite?<i key={products.id} className="fa-solid fa-heart fa-2xl "   style={{color: "#d02525",}}  onClick={()=>removeFromWishList(products.id)}></i> 
            :
            <i key={products.id} className="fa-solid fa-heart fa-2xl"   onClick={()=>addToWishList(products.id)}></i>

          }
       
           </div>

      </div>)}
      {/* } */}
    </div>
  </div>
  }
  </>
}
