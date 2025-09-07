import React from 'react'
import Logo from './Logo'
import { X } from 'lucide-react'
import HeaderLink from "./HeaderLink"
import SocailMedia from './SocialMedia'

const SideMenu = ({isopen,onclose}) => {
  return (
    <div onClick={onclose} className={`text-white fixed z-100  w-full inset-y-0 h-screen bg-black/50 hovereffect left-0 ${isopen? "translate-x-0":"-translate-x-full"} `} >
        <div className=' w-3/4 p-10 h-screen bg-black  flex flex-col gap-8 ' >
       <div className=' flex text-white justify-between items-center  ' >
         <Logo className={'text-white'}  />
         <button onClick={onclose} ><X/></button>
       </div>
       <div className=' flex flex-col gap-12' >
        <HeaderLink className={'flex flex-col text-white'} />
        <hr className=' border-dashed  border-zinc-50/40 ' />
       <SocailMedia/>

       </div>
       
        </div>
    </div>
  )
}

export default SideMenu