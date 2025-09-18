import React from 'react'
import { LogOut,Menu } from 'lucide-react';

const Header = () => {
  return (
    <section className=' w-full px-4 py-2  items-center  border shadow  flex justify-between ' >
<button className=' lg:hidden sm:block ' >
        <Menu size={30} />
        <span className='sr-only' >toggle</span>

</button>
      
      <div className=' flex flex-1 justify-end ' >
       <button className=' bg-black text-white px-3 rounded-md py-2 flex gap-2'>
         <LogOut />
        <span>logout</span>
       </button>
      </div>
      

    </section>
  )
}

export default Header