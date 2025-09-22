"use client"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { useState } from "react"

const Adminlayout = () => {
  const [open, setopen] = useState(false)

  return (
    <section className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar (fixed width, full height) */}
      <aside className="w-64 h-screen fixed left-0 top-0 border-r bg-white">
        <Sidebar open={open} setopen={setopen} />
      </aside>

      {/* Main content (shifted right by sidebar width) */}
      <div className="flex flex-1 flex-col ml-64">
        {/* Header (fixed height) */}
        <header className="h-14 border-b bg-white sticky top-0 z-10">
          <Header setopen={setopen} />
        </header>

        {/* Page content fills remaining space */}
        <main className="flex-1  p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </section>
  )
}

export default Adminlayout
