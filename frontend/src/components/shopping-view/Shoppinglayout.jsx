import React from 'react'
import { Header } from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Shoppinglayout () {
  return (
  <section className='  ' >
    <Header/>
    <main className=' ' >
        <Outlet/>
    </main>

    <Footer/>
  </section>
  )
}
