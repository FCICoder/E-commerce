import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline, Online } from "react-detect-offline";
export default function Layout() {

return <>
  <Navbar/>
  <div className="container">
      <Outlet/>
  </div>

  <div>
    {/* <Online>Only shown when you're online</Online> */}
    <Offline>
      <div className='network'>
        <i className='fas fa-wifi text-danger'></i>You are OffLine
      </div>
    </Offline>
  </div>
  <Footer/>
  </>
}
