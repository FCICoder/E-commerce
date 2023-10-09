import { useContext,useEffect } from 'react'
import './App.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Categories from './components/Categories/Categories'
import Notfound from './components/Notfound/Notfound'
import Brands from './components/Brands/Brands'
import CounterContextProvider from './context/CounterContext'
import { userContext } from './context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Profile from './components/Profile/Profile'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import Address from './components/address/address'
import Orders from './components/Orders/Orders'
import WishList from './components/WishList/WishList'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import UpdatePassword from './components/UpdatePassword/UpdatePassword'
function App() {
  
  let {setUserToken} = useContext(userContext);
  
  useEffect(() => {
    if (localStorage.getItem("userToken")!==null){
      setUserToken(localStorage.getItem("userToken"));
    }  
  }, [])
  
  let routes = createBrowserRouter([
    {path: '/E-commerce/', element:<Layout/>,children: [
      {index :true, element:<ProtectedRoute><Home/></ProtectedRoute>  },
      {path: 'products', element:<ProtectedRoute> <Products/></ProtectedRoute> },
      {path: 'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path: 'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path: 'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path: 'profile', element:<ProtectedRoute><Profile/></ProtectedRoute>},
      {path: 'address', element:<ProtectedRoute><Address/></ProtectedRoute>},
      {path: 'allorders', element:<ProtectedRoute><Orders/></ProtectedRoute>},
      {path:'register', element:<Register/>},
      {path: 'login', element:<Login/>},
      {path: 'productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path: 'wishList', element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path: 'forgotPassword', element:<ForgetPassword></ForgetPassword>},
      {path: 'verfyCode', element:<VerifyCode></VerifyCode>},
      {path: 'resetPassword', element:<UpdatePassword></UpdatePassword>},



      {path: '*', element:<Notfound/>}

    ]},
  ])
  
  
  return (
    <>
    <CounterContextProvider>
  
      <Provider store={store}>
        <RouterProvider router={routes}></RouterProvider>   
        <Toaster></Toaster>  
        </Provider>  
  
    </CounterContextProvider>
   
    
    </>
  )
}

export default App
