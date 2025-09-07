import { cn } from '@/lib/utils'
import React from 'react'
const Logo = ({className}) => {
  return (
    <div className={cn('logo uppercase text-blue   hovereffect hover:text-violet    group ',className)} >
        Shah <span className=' text-violet group-hover:text-blue ' >Store</span>
    </div>
  )
}
 export default Logo