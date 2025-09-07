import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FavouriteIcon = () => {
  return (
        <Link href={'/cart'} className=' size-3 hovereffect hover:text-blue relative ' ><Heart/>
    <span className=' absolute -top-0.5  -right-4 size-3.5 bg-violet text-white flex items-center justify-center text-xs rounded-full ' > 0</span>
    </Link>
  )
}

export default FavouriteIcon