import axios from 'axios';
import  { createContext, useEffect, useState } from 'react'


export let CartContext = createContext();
let userToken = localStorage.getItem('userToken')
let headers = {
    token:userToken
}
function addtoCart(productId){
  try{
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:productId},{headers:headers}).then((res)=>res)
    .catch((err)=>{err.message})
  }catch(err){
    console.log(err.message);
  }
   
}

function getLoggedUserCart(){
  try{
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then((res)=>res).catch((err)=>{err.message});

  }catch(err){
    console.log(err.message);
  }
}

function removeCartItem(productId){
  try{
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
    .then((res)=>res)
    .catch((err)=>err)
  } catch(err){
    console.log(err.message);
  }
  
}

async function updateProductQuantity(productId ,quantity){
  try{
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:quantity},{headers})
    .then((res)=>res)
    .catch((err)=>err);
  }catch(err){
    console.log(err.message);
  }
     
}

async function onlinePayment(cartId,url, values){
  try{
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {shippingAddress : values}
    ,{headers})
    .then((res)=>res)
    .catch((err)=>err);
  }catch(err){
    console.log(err.message);
  }
     
}

function clearUserCart(){
  try{
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,{headers})
    .then((res)=>res)
    .catch((err)=>err.message);
  }catch(err){
    console.log(err.message);
  }
      
}

export default function CartContextProvider({children}){

let[cartId , setCartId] = useState(null);

async function getCartId (){
 let {data} = await getLoggedUserCart();
 setCartId(data?.data._id);
} 

useEffect(()=>{
getCartId();
},[])

return <CartContext.Provider value={{ cartId ,addtoCart, getLoggedUserCart , removeCartItem ,updateProductQuantity , clearUserCart , onlinePayment }}>
    {children}
</CartContext.Provider>
}

