import React from 'react'
import Header from './header'
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
   <main className="p-4 max-w-[85%] m-auto text-[#222]">
    <Header />
    <Outlet />
   </main>
  )
}

export default Layout