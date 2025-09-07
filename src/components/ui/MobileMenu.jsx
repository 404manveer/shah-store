"use client"
import { AlignLeft } from 'lucide-react'
import React, { useState } from 'react'
import SideMenu from './SideMenu'

const MobileMenu = () => {
  const [isSildeMenuOpen,setisSildeMenuOpen] =useState(false)
  return (
<>
    <button onClick={()=>setisSildeMenuOpen(!isSildeMenuOpen)} className=' md:hidden ' ><AlignLeft className=' size-8  '/></button>
    <SideMenu isopen={isSildeMenuOpen} onclose={( )=>setisSildeMenuOpen(false)} />
</>  )
}

export default MobileMenu