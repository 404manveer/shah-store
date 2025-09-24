import { useDispatch } from "react-redux"
import { Button } from "../ui/button"
import {Card, CardContent, CardFooter} from "../ui/card"



import React from 'react'
import { adminDeleteProduct, adminfetchProduct } from "../../store/actions/admin/adminProduct"

const adminProduct = ({product,setimageloading,setCurrentEditId,setopen,setFormData,setImageFile,setImageFileUrl}) => {
  // console.log(product,"ldslsjf<<<<<<<<<");
  const edithandle=()=>{
    setCurrentEditId(product._id)
    setFormData({...product})
    setopen(true)
    setImageFile(true)
    setImageFileUrl(product.image)
    console.log("dkjfkslljf");
    

    
  }
  const dispatch = useDispatch()
  const deletehandle =()=>{
    console.log("delete calling>>>>>");
    

dispatch(adminDeleteProduct({id:product._id})).then((data)=>{
  if(data.payload.sucess){
    dispatch(adminfetchProduct())
  }
})

  }
  
  return (
  <Card className=" w-full rounded-3xl  " >
   
 <div>
  <div className="relative  w-full  rounded-3xl h-[15rem] overflow-hidden  " >
    <img src={product.image} alt={product.title} className=" overflow-hidden w-full h-full object-cover object-center " />
  </div>
    <h1 className=" text-center text-xl font-semibold mb-2  "  >{product.title}</h1>
  <CardContent className=" flex  items-center justify-between  "  >
   <div className={` flex items-center justify-between gap-5 `}   > <span className={` ${product.saleprice? " line-through opacity-50 ":""}`} >${product.price}</span> 
   { product.saleprice>0 && <span> Sale Price: ${product.saleprice}</span>}
   </div>
   <span>{product.stock}</span>
  </CardContent>
  <CardFooter className=" flex items-center justify-between  "  >
    <Button  onClick={edithandle} >Edit</Button>
    <Button onClick={deletehandle} >Delete</Button>

  </CardFooter>
 </div>
  </Card>
  )
}

export default adminProduct