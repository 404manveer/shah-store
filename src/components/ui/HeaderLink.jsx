"use client"
import React from 'react'
import {navlink} from "@/data/navlink"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'



const HeaderLink = ({className}) => {
    const pathname = usePathname()
  return (
    <div className={cn(`hidden md:flex gap-8 text-ms font-semibold capitalize   `,className)}   >
    {navlink.map((item,id)=>{
        return(
         <Link key={id}  className={`relative group  ${pathname ===item.href && ('text-violet')} `}  href={item.href} >{item.title}
        <span className={`border opacity-0 inline-block absolute -bottom-0.5 w-0 hovereffect left-1/2 group-hover:left-0 group-hover:w-1/2  group-hover:opacity-100  ${pathname ===item.href && ('text-violet opacity-100 left-0 w-1/2')}  `} />
         <span className={`border opacity-0 inline-block absolute -bottom-0.5 w-0 hovereffect right-1/2 group-hover:right-0 group-hover:w-1/2  group-hover:opacity-100 ${pathname ===item.href && ('text-violet opacity-100 right-0 w-1/2')} `} />
         </Link>

        )
    })}
    </div>
  )
}

export default HeaderLink