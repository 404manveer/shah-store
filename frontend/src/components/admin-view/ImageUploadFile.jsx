import React from "react";
import { Label } from "../ui/label";
import { CloudUploadIcon, FileIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import {api} from "../../api/axiosconfig"
import{Skeleton} from "../../components/ui/skeleton"
import { useRef } from "react";

const ImageUploadFile = ({
  ImageFile,
  setImageFile,
  ImageFileUrl,
  setImageFileUrl,
  setimageloading,
  imageloading,
  isEditMode,
}) => {
  console.log("editmode>>>",isEditMode);
  
  const refinp = useRef(null)
  const handleimageupload = (event) => {
    event.preventDefault();
    const file = event.target.files?.[0]
    if(file){console.log("image>>>>>",file);}
    
    setImageFile(file);
  };
const handleDragOver = (e)=>{
    e.preventDefault()
}
const handleDrop =(e)=>{
    e.preventDefault();
    const file = e.dataTransfer.files?.[0]
    if(file){
        setImageFile(file)
    }
    
}
const handleRemove = (e)=>{
    e.preventDefault()
    setImageFile(null)
    setImageFileUrl(null)
    console.log("remove",ImageFile);
    console.log("remove",ImageFileUrl);
   if(refinp.current) refinp.current.value="";
    
}

async function UploadImageCloundinary() {
  setimageloading(true)
  const data = new FormData()
  console.log("formdata imgage>>>",data);
  
  data.append("MY_file",ImageFile)
  console.log("after append......",data);
  
  const response =await api.post("/api/admin/product/upload-image",data).then(
    (data)=>{
      console.log("gettingimageurl>>>>>",data);
      
       if(data.data.success){setImageFileUrl(data.data.url)
    setimageloading(false)
  console.log(imageloading,isEditMode);
  
  }
    }
  )
 
   
    
  
}

useEffect(()=>{
  if(ImageFile || !isEditMode) UploadImageCloundinary()
},[ImageFile])
if(isEditMode && ImageFileUrl ) {setimageloading(false)}

  return (
    <div className="  " >
      <Label>Upload Image</Label>
      <div   className="border-dashed flex flex-col w-full h-36 border-2 items-center justify-center mt-4 p-6 " >
        <input
          type="file"
          name="image-upload"
          id="image-upload"
          className="hidden"
          onChange={handleimageupload}
          ref={refinp}
        />
         {ImageFile? (
           imageloading? <Skeleton className="bg-gray-200 w-[6rem] h-[10rem] " /> :
            <div className="overflow-hidden border-4 w-full h-full relative  flex  justify-between" >
                  <img src={ImageFileUrl} alt="img"  className=" w-full h-full object-cover object-center" />
                  <XIcon onClick={handleRemove} className=" absolute top-0 right-0 " />
            </div>
         ):( <label htmlFor="image-upload" onDragOver={handleDragOver} onDrop={handleDrop} className="flex flex-col items-center justify-center"  >
         <CloudUploadIcon size={50} />
        <p>Drag and Drop or click to upload image
        </p>
       </label>)}
      </div>
      
     
      
    </div>
  );
};

export default ImageUploadFile;
