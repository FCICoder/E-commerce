import { useContext, useEffect, useState } from 'react'
import { wishListContext } from '../../context/wishListContext'
import { ColorRing } from 'react-loader-spinner';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';
// import style from './WishList.module.css'

export default function WishList() {
  
  let {addtoCart} = useContext(CartContext)
let {getloggedwishlist, removeProduct}=useContext(wishListContext);
let [wishdata , setWishdata] = useState(null);
let [flag , setFlag] = useState(true);

async function getloggedWishes(){
 let{data} = await getloggedwishlist()
  console.log(data);
 setWishdata(data);
 if(data.count >=0){
  setFlag(true)
 }
}


async function addProductToCart(prodId){
  let res = await addtoCart(prodId); 
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
async function removeItem(prodId){
  let{data} = await removeProduct(prodId)
  setFlag(true)
  setWishdata(data);
    if(data.status==='success'){
      setWishdata(null);
     
    }
   
 }
useEffect(() =>{
  getloggedWishes()
},[wishdata])


let info = wishdata?.data;
console.log(info);
  return <>

 {wishdata && flag?<div className=' my-4 mx-auto p-2 bg-main-light'>
    <h2 className='fw-bold text-center'>My Wish List: </h2>
    <h4 className='h6 text-main fw-bolder text-center'> wishList Items :{wishdata.count}</h4>
 
    {info.map((prod)=><div key={prod.id} className="row border-bottom border-4 border-info-subtle py-3 mx-5">
        <div className="col-md-3">
          <img className='w-100' src={prod.imageCover} alt="image Cover" />
        </div>
        <div className="col-md-9 d-flex align-items-center ">
          <div className='w-100  d-flex justify-content-between align-items-center'>
            <div>
              <h3 className='h6 fw-bold'>{prod.title }</h3>
              <h6 className='text-main fw-bold'> price : {prod.price}EGP</h6>
              <button  className='btn p-0 text-danger fw-bold h2' onClick={()=>removeItem(prod.id)}><i className='fas font-sm fa-trash-can h1 fw-bolder '> </i>Remove</button>
            </div>
            <div className=''>
              
              <button className='btn bg-main text-white w-100 btn-sm mt-2' onClick={()=>addProductToCart(prod.id)}>add to cart</button>

            </div>

          </div>
        </div>
      </div>
    )}

  </div>:
  <section className='w-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center'style={{height:500}}>
  <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/></section>
}
  </>
}
