import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
<section className='auth-layout w-full flex min-h-[100vh]   ' >
    <div className="layout bg-black hidden lg:flex w-1/2 items-center justify-center px-20  ">
        <h1 className=' text-primary h1 font-[700] text-center ' >WELCOME TO <br />  SHOP </h1>
    </div>
    <div className=' w-1/2  ' >
        <Outlet/>
    </div>


</section>
)
}

export default AuthLayout