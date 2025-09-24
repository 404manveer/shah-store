import React, { Fragment, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Productcard from "../../components/admin-view/adminProduct";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import ImageUploadFile from "../../components/admin-view/ImageUploadFile";
import {adminCreateProduct, adminfetchProduct, adminUpdateProduct, } from "../../store/actions/admin/adminProduct"
import {useDispatch,useSelector} from "react-redux"
import {toast} from "sonner"
import { Flag } from "lucide-react";





function Aside({
  ImageFile,
  setImageFile,
  setImageFileUrl,
  ImageFileUrl,
  open,
  setopen,
  imageloading,
  setimageloading,
  formData,
  setFormData,
  initialData,
  currenEditId,
  setCurrentEditId
}) {
  const dispatch = useDispatch()
  const handleonChange= (e)=>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value})

  }
 
  const handleformsubmit = (e) => {
    e.preventDefault()
console.log(formData);

currenEditId !==null? dispatch(adminUpdateProduct({id:currenEditId,formData})).then((data)=>{
  console.log("editproduct",data);
  if(data.payload.success){

    setFormData(initialData)
    setCurrentEditId(null)
    dispatch(adminfetchProduct())
    setopen(false)
    toast('product updated successfully')
  }
  
}):

 dispatch(adminCreateProduct({...formData,image:ImageFileUrl})).then(
  (data)=>{
    if(data.payload.success){
      setopen(false)
 setFormData(initialData)
 setImageFile(null)
 setImageFileUrl(null)
 dispatch(adminfetchProduct())
 toast("Product create successfully")

 
    }
  }
 )
 

 
    
  };
  // console.log("dsfs",formData);
  
  console.log(currenEditId,"dsfsdf"); 
  // its giving null
  return (
    <Sheet open={open} onOpenChange={()=>{
      setopen(false);
      setFormData(initialData)
      setCurrentEditId(null)
      setImageFileUrl(null)
      setImageFile(null)
    }}>
      <SheetContent
        side="right"
        className="bg-white text-black p-0 max-h-screen flex flex-col"
      >
        <SheetHeader className="p-6 border-b">
          <SheetTitle>{currenEditId !==null? "Edit Product":"Create new product"}</SheetTitle>
        </SheetHeader>

        {/* Scrollable form fields */}
        <div className="flex-1 overflow-y-auto p-2">
          <form
            id="product-form"
            onSubmit={handleformsubmit}
            className="flex flex-col gap-4"
          >
            <ImageUploadFile
              imageloading={imageloading}
              setimageloading={setimageloading}
              ImageFile={ImageFile}
              setImageFile={setImageFile}
              ImageFileUrl={ImageFileUrl}
              setImageFileUrl={setImageFileUrl}
              isEditMode={currenEditId !==null}
            />

            <div>
              <Label>Title</Label>
            <Input type="text" name="title" id='title' value={formData.title} onChange={handleonChange}
              />
            </div>

            <div>
              <Label>description</Label>
              <Input type="text" name='description' id="description" value={formData.description} onChange={handleonChange} />
            </div>

            <div>
              <Label>Category</Label>
         
                  <Select
                    onValueChange={(e)=>{setFormData({...formData,category:e})}}
                    value={formData.category}
                    
                  >
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
            
                <Select onValueChange={(value)=>{setFormData({...formData,brand:value})}}
                value={formData.brand} >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={"nike"} value="nike">Nike</SelectItem>
                  <SelectItem key={"puma"} value="puma">Puma</SelectItem>
                  <SelectItem key={"sega"} value="sega">Sega</SelectItem>
                  <SelectItem  key={"adidas"} value="addidas">Addidas</SelectItem>
                  <SelectItem key={"redtape"} value="redtape">Redtape</SelectItem>
                </SelectContent>
              </Select>
             
            </div>

            <div>
              <Label>Price</Label>
              <Input type="text" name="price" id="price" value={formData.price} onChange={handleonChange} />
            </div>

            <div>
              <Label>Sale price</Label>
              <Input type="text" id='saleprice' value={formData.saleprice} name="saleprice" onChange={handleonChange} />
            </div>

            <div>
              <Label>Stock</Label>
              <Input type="text" id="stock" name='stock' value={formData.stock} onChange={handleonChange}  />
            </div>
            <Button type="submit" form className="bg-black w-full text-white">
              {currenEditId !==null? "Edit":"Add"}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}





const Product = () => {
const initialData ={
    image:"",
    title:"",
    description:'',
    brand:"",
    category:'',
    price:'',
    saleprice:'',
    stock:'',
  }
  const dispatch = useDispatch()
  const {ProductList} = useSelector(state =>state.adminProducts)
  const [formData,setFormData] = useState(initialData)
  const [open, setopen] = useState(false);
  const [ImageFile, setImageFile] = useState(null);
  const [ImageFileUrl, setImageFileUrl] = useState(null);
  const [imageloading, setimageloading] = useState(false);
  const [currenEditId,setCurrentEditId] =useState(null)


  useEffect(()=>{
    dispatch(adminfetchProduct())
  },[dispatch])


  return (
    <Fragment>
      <div
        onClick={() => setopen(true)}
        className="w-full flex justify-end  pr-4 mt-4 "
      >
        <Button className="bg-black text-white">Add New Product</Button>
      </div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-12 items-center justify-center" >
  {ProductList.map((product,idx)=>{
    return(
      <Productcard key={idx} setimageloading={setimageloading}  setImageFile={setImageFile} setImageFileUrl={setImageFileUrl} setCurrentEditId={setCurrentEditId}  setopen={setopen} setFormData={setFormData} product={product} />

    )
  })}
  
</div>


      <Aside
        ImageFile={ImageFile}
        setImageFile={setImageFile}
        ImageFileUrl={ImageFileUrl}
        setImageFileUrl={setImageFileUrl}
        open={open}
        setopen={setopen}
        setimageloading={setimageloading}
        imageloading={imageloading}
        initialData={initialData}
        formData={formData}
        setFormData={setFormData}
        setCurrentEditId={setCurrentEditId}
        currenEditId={currenEditId}
      />
    </Fragment>
  );
};

export default Product;
