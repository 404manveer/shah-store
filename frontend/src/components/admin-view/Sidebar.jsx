import React, { Fragment } from 'react'
import { ChartNoAxesCombined, LayoutDashboard,BaggageClaim,ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  const menuitem = [
    {id:'dashboard',
      label:'Dashboard',
      path:'/admin/dashboard',
      icon:<LayoutDashboard />
    },
    {id:'order',
      label:'Order',
      path:'/admin/order',
      icon:<BaggageClaim />
    },
    {id:'products',
      label:'Products',
      path:'/admin/products',
      icon:<ShoppingBag />
    },
  ]

  function Menu(){
    return(
     <nav className=' mt-10 flex flex-col gap-6 ' >
       {menuitem.map(menu=><div  key={menu.id}  onClick={()=>navigate(menu.path)}   className=' cursor-pointer flex gap-2   ' >
       {menu.icon}
      <span>{menu.label}</span>
        

      </div>)}
     </nav>
    )
  }
  return (
<Fragment>
  <aside className=' w-[15rem] border-r h-screen p-6     hidden lg:flex flex-col '   >
  <div onClick={()=>navigate("/admin")} className=' flex gap-2 items-center  cursor-pointer ' > <ChartNoAxesCombined /> <h1 className='font-semibold text-xl ' >Admin Panel</h1> </div>
  <Menu/>

</aside>
</Fragment>
  )
}

export default Sidebar