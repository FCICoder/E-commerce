import { useContext, useEffect, useState } from 'react'
// import style from './Cart.module.css'
import { CartContext } from '../../context/CartContext'
// import { useQuery } from 'react-query';
// import toast from 'react-hot-toast';
import { ColorRing} from 'react-loader-spinner'
import { Link } from 'react-router-dom';

export default function Cart() {
  let {getLoggedUserCart , removeCartItem , updateProductQuantity , clearUserCart}= useContext(CartContext);
  let [cartdata , setCartdata] = useState(null);
  let [flag , setFlag] = useState(false);

  async function getCart(){
    let { data }= await getLoggedUserCart();
   
      setCartdata(data);
      if(cartdata != null && data?.numOfCartItems >= 0){
        setFlag(true)
       }
  }

  async function removeItem(id){
    let { data }= await removeCartItem(id);

    setFlag(false)
    setCartdata(data);    
  }

  async function updatCount (id,count){
    let {data} = await updateProductQuantity(id,count);
    setCartdata(data);
  }

  async function removeCartItems (){
    let {data} = await clearUserCart();

    setFlag(true)
    setCartdata(data);
    if(data.message==='success'){
     
      setCartdata(null);
    }
   

  }
  
  useEffect(() =>{
    getCart()
    if(cartdata?.numOfCartItems === null){
      cartdata.numOfCartItems = 0
    }
  },[cartdata?.numOfCartItems])
  let info = cartdata?.data?.products;

  return <>

  
  { flag ?<div className='w-75 my-3 mx-auto p-2 bg-main-light'>
    <h1 className='text-center fw-bolder'>shoppin cart: </h1>
    <h3 className='h6 text-main fw-bolder text-center'> Cart Items :{cartdata?.numOfCartItems}</h3>
    <h3 className='h6 text-main fw-bolder mb-4 text-center' > Total Cart Price :{cartdata?.data?.totalCartPrice} EGP</h3>
    <button className='btn btn-danger text-light' onClick={()=>removeCartItems()}><i className='fas font-sm fa-trash-can h6'> </i> Clear Cart</button>

    {info?.map((prod)=><div key={prod.product.id} className="row border-bottom py-2">
        <div className="col-md-1">
          <img className='w-100' src={prod.product.imageCover} alt="image Cover" />
        </div>
        <div className="col-md-11">
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <h3 className='h6'>{prod.product.title.split(' ').splice(0,3).join(' ') }</h3>
              <h6 className='text-main'> price : {prod.price}EGP</h6>
            </div>
            <div>
                <button className='btn btn-outline-primary ' onClick={()=>updatCount(prod.product.id , prod.count+1)}>+</button>
                <span className='mx-2'>{prod.count}</span>
                <button  className='btn btn-outline-primary ' onClick={()=>updatCount(prod.product.id , prod.count-1)}>-</button>
            </div>
          </div>
          <button  className='btn p-0 text-danger' onClick={()=>removeItem(prod.product.id)}><i className='fas font-sm fa-trash-can h6'> </i> Remove</button>
        </div>
      </div>
    )}
    <Link to={'/address'} className='btn m-3 bg-main w-25 text-white'>
       Online Payment
    </Link>
    <button className='btn m-3 bg-main w-25 text-white'> Cash on Dilevery</button>

  </div>:
  <section className='w-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center' style={{height:500}} >
  <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/></section> }

  </>
}
