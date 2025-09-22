import React, { Fragment } from 'react'
import {Button} from "../../components/ui/button"
import { SheetContent,Sheet, SheetHeader, SheetTitle } from '../../components/ui/sheet'
import { useState } from 'react'
import {Input} from '../../components/ui/input'
import {Label} from '../../components/ui/label'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../../components/ui/select'
import ImageUploadFile from '../../components/admin-view/ImageUploadFile'
import {useForm} from "react-hook-form"

function Aside({ImageFile,setImageFile,setImageFileUrl,ImageFileUrl,open,setopen}){

const {register,reset,handleSubmit,formState:{errors}} = useForm()
   const handleformsubmit = (e)=>{
    console.log(e);
    
    

  }
 return(
     <Sheet open={open} onOpenChange={setopen} >
         <SheetContent side="right" className="bg-white text-black p-0 max-h-screen flex flex-col">
  <SheetHeader className="p-6 border-b">
    <SheetTitle>New Photo</SheetTitle>
  </SheetHeader>

  {/* Scrollable form fields */}
  <div className="flex-1 overflow-y-auto p-2">
    <form id='product-form' onSubmit={handleSubmit(handleformsubmit)} className="flex flex-col gap-4">
      <ImageUploadFile
        ImageFile={ImageFile}
        setImageFile={setImageFile}
        ImageFileUrl={ImageFileUrl}
        setImageFileUrl={setImageFileUrl}
      />

      <div>
        <Label>Title</Label>
        <Input type="text" {...register("title",)} />
      </div>

      <div>
        <Label>Description</Label>
        <Input type="text" {...register("description")} />
      </div>

      <div>
        <Label>Category</Label>
        <Select {...register("category")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="child">Child</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Brand</Label>
        <Select {...register("brand")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nike">Nike</SelectItem>
            <SelectItem value="puma">Puma</SelectItem>
            <SelectItem value="sega">Sega</SelectItem>
            <SelectItem value="addidas">Addidas</SelectItem>
            <SelectItem value="redtape">Redtape</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Price</Label>
        <Input type="text" {...register("price")} />
      </div>

      <div>
        <Label>Sale price</Label>
        <Input type="text" {...register("sale_price")} />
      </div>

      <div>
        <Label>Stock</Label>
        <Input  type="text" {...register("stock")} />
      </div>
        <Button   type="submit" form   className="bg-black w-full text-white">
      Add
    </Button>
      
    </form>
  </div>


</SheetContent>

        </Sheet>
 )
}
const Product = () => {
  const [open, setopen] = useState(false)
  const [ImageFile, setImageFile] = useState(null)
  const [ImageFileUrl, setImageFileUrl] = useState(null)
 
  

  return (
    <Fragment>

      <div  onClick={()=>setopen(true)} className='w-full flex justify-end  pr-4 mt-4 ' >
        <Button  className="bg-black text-white" >Add New Product</Button></div>
      <Aside    ImageFile={ImageFile}
        setImageFile={setImageFile}
        ImageFileUrl={ImageFileUrl}
        setImageFileUrl={setImageFileUrl} open={open} setopen={setopen} />
    </Fragment>
  
  )
}

export default Product



