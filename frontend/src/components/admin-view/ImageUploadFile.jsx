import React from "react";
import { Label } from "../ui/label";
import { CloudUploadIcon, FileIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import {api} from "../../api/axiosconfig"

const ImageUploadFile = ({
  ImageFile,
  setImageFile,
  ImageFileUrl,
  setImageFileUrl,
}) => {
  const handleimageupload = (event) => {
    event.preventDefault();
    const file = event.target.files?.[0]
    if(file){console.log(file);}
    
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
}

async function UploadImageCloundinary() {
  const data = new FormData()
  data.append("MY_file",ImageFile)
  const response =await api.post("/api/admin/product/upload-image",data)
  if(response.data.success)setImageFileUrl(response.data.url)
    console.log("re>>>>",response);
    
    console.log(response.url);
    
  
}

useEffect(()=>{
  if(ImageFile !==null) UploadImageCloundinary()
})

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
        />
         {ImageFile? (
            <div className="overflow-hidden border-4 w-full h-full relative  flex  justify-between" >
                  <img src={ImageFileUrl} alt="img"  className=" w-full h-full object-cover object-center" />
                  <XIcon onClick={handleRemove} className=" absolute top-0 right-0 " />
               
            {/* <FileIcon/> 
            <span>{ImageFile.name}</span>
            <XIcon onClick={handleRemove} /> */}
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
