import React from 'react'
import { CardContent } from "../ui/card"

export const ShoppingProduct = ({product}) => {
  return (
   <card class >
    <div>
        <div>
            <img src={product.image} alt={product.title} />
        </div>
        <CardContent></CardContent>
    </div>
   </card>
  )
}
