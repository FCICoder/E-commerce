import React from 'react'
import style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
  if(localStorage.getItem('userToken')!==null){
    return children
  }else{
    return <Navigate to={'/E-commerce/login'}/>
  }
  
}
