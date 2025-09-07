import { cn } from '@/lib/utils'
import React from 'react'

const Container = ({children,className}) => {
  return (
<div className={cn('max-w-[556px]  md:max-w-[720px] lg:max-w-[940px] xl:max-w-[1140px]   mx-auto max-sm:px-4 ',className)} >
    {children}
</div>
  )
}

export default Container