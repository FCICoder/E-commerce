import axios from "axios";
import { createContext, useState } from "react";

export let wishListContext = createContext();

let userToken = localStorage.getItem('userToken')
let headers = {
    token:userToken
}
let flager = true;

async function addtoWishList(prodId){
    
      return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {productId:prodId},{headers:headers})
      .then((resp)=>resp).catch((err)=>err)
}

async function getloggedwishlist(){
    try{
        flager= true;
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
        .then((res)=>res).catch((err)=>err.message)
        
    }catch(err){
        console.log(err.message);
    }
}

async function removeProduct(prodId){
    try{
        flager = false;
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,{headers})
        .then((res)=>res).catch((err)=>err.message)
    }catch(err){
        console.log(err.message);
    }
}

export function WishContextProvider(props){
    let [flag2 , setflage2 ] = useState(true);
    return <wishListContext.Provider value={{  flager,  flag2,setflage2, addtoWishList , getloggedwishlist , removeProduct }}>
        {props.children}
    </wishListContext.Provider>
}
