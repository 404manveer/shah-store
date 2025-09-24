"use client"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { useState } from "react"

const Adminlayout = () => {
  const [open, setopen] = useState(false)

  return (
    <section className="flex h-screen w-screen ">
      {/* Sidebar (fixed width, full height) */}
   
        <Sidebar open={open} setopen={setopen} />
  

      {/* Main content (shifted right by sidebar width) */}
      <div className="flex flex-1 flex-col lg:ml-64    ">
        {/* Header (fixed height) */}
        <header className="h-14 border-b bg-white sticky top-0 z-10">
          <Header setopen={setopen} />
        </header>

        {/* Page content fills remaining space */}
        <main className="flex-1  p-4 bg-gray-50 overflow-x-hidden  ">
          <Outlet />
        </main>
      </div>
    </section>
  )
}

export default Adminlayout
