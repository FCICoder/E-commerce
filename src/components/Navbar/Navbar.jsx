import { useContext, useEffect, useState } from 'react'
// import style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { userContext } from '../../context/UserContext'
import {CounterContext} from '../../context/CounterContext'
// import { useSelector } from 'react-redux'
import { CartContext } from '../../context/CartContext'
import { wishListContext } from '../../context/wishListContext'

export default function Navbar() {
  // let {counter} = useSelector((state)=>state.counter)
let {getloggedwishlist, removeProduct}=useContext(wishListContext);

  let {userToken ,setUserToken} = useContext(userContext)
  let {Counter,setCounter} = useContext(CounterContext);
  let {getLoggedUserCart }= useContext(CartContext);
  let [cartdata , setCartdata] = useState(null);
let [wishdata , setWishdata] = useState(null);

  let navigate =useNavigate();

  async function getCart(){
    let { data }= await getLoggedUserCart();
    
      setCartdata(data);
      
      if(cartdata != null && data.numOfCartItems >= 0){
        // setFlag(true)
        setCounter(cartdata?.numOfCartItems);
       }else if(cartdata.numOfCartItems == 0 ){
        setCounter(0)
       }
  }
  async function getloggedWishList(){
    let{data} = await getloggedwishlist()
    setWishdata(data);

    setWishCounter(data.count)
  
   }
  
  let [wishCounter, setWishCounter] = useState(0);

  function logout(){
    localStorage.removeItem('userToken');
    setUserToken(null);
    setCounter(0);
    navigate('/login');
  }


  useEffect(() =>{
    getCart();
    getloggedWishList();
     cartdata?.numOfCartItems;
    if(cartdata?.numOfCartItems === null){
      cartdata.numOfCartItems = 0; 
    }
 
    },[cartdata])


  return <>
   <nav className="navbar navbar-expand-lg mb-5" >
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo}  alt="frsh market logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse fw-bold  justify-content-around " id="navbarSupportedContent">
                   <ul className='navbar-nav  mb-2 mb-lg-0' >
                  {userToken !== null ?<>
            
                      <li className='nav-item'>
                          <NavLink className="nav-link "  aria-current="page" to=" ">Home </NavLink>                
                      </li> 
                      {/* <li className='nav-item'>
                          <Link className="nav-link " aria-current="page" to="/products">Products </Link>                
                      </li> */}
                      <li className='nav-item'>
                          <NavLink className="nav-link "  aria-current="page" to="/categories">Categories</NavLink>                
                      </li>
                      <li className='nav-item'>
                          <NavLink className="nav-link " aria-current="page" to="/brands">Brands</NavLink>                
                      </li>
                      <li className='nav-item'>
                          <NavLink className="nav-link " aria-current="page" to="/cart">Cart</NavLink>                
                      </li> 
                      {/* <li className='nav-item'>
                          <NavLink className="nav-NavLink " aria-current="page" to="/profile">Profile</NavLink>                
                      </li> */}
                      <li className='nav-item'>
                          <NavLink className="nav-link " aria-current="page" to="/wishList">wishList</NavLink>                
                      </li> 

            </>
                     
                  :"" }   
                   </ul>
              
                   <ul className='navbar-nav  mb-2 mb-lg-0' >
                    
                   
                      {userToken !==null ? <>
                        <li  className='nav-item mb-3 list-unstyled mt-2' style={{height:3}}>
                    <Link rel="stylesheet" className=' me-3' to="/wishList" >
                      <i  className=" fa-solid fa-heart fs-4 " style={{color:"red"}}>
                      <p className='crt text-dark' > {wishCounter}</p>
                      </i>
                   </Link>
                      
                    
                    <Link rel="stylesheet" className='' to="/cart" >
                      <i  className=" fa-solid fa-cart-shopping fs-4 ">
                      <p className='crt'> {Counter}</p>

                      </i>
                   </Link>
                    </li>

                        <li className='nav-item'>
                          <span className="nav-link cursor-pointer" aria-current="page" onClick={logout}>Logout</span>                
                      </li>
                      </>:<>
                      <li className='nav-item'>
                          <Link className="nav-link " aria-current="page" to="login ">Login</Link>                
                      </li> 
                      <li className='nav-item'>
                          <Link className="nav-link " aria-current="page" to="register">Register</Link>                
                      </li>
                     
                      </>}
                      <li className='nav-item d-flex align-items-center'>
                          <i className='fab fa-facebbook mx-2'></i>
                          <i className='fab fa-twitter mx-2'></i>
                          <i className='fab fa-instagram mx-2'></i>
                          <i className='fab fa-youtube  mx-2'></i>
                          <i className='fab fa-tiktok  mx-2'></i>

                      </li>
                      

                    
                   </ul>
      
    </div>
  </div>
</nav>
   {/* <button className=' btn btn-info' onClick={changeCounter}> change</button> */}
  </>
}
