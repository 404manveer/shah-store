const express = require('express');
const { imageUploadCloudinary } = require('../../helpers/cloudinary');




 const handleImageUpload = async(req,res)=>{
    try {
        const  b64 = Buffer.from(req.file.buffer).toString("base64")
        const url = `data:${req.file.mimetype};base64,${b64}`
        const result = await imageUploadCloudinary(url)
        res.json({
            success:true,
            message:"image uploaded",
            url:result.url
        })
        
    } catch (error) {
        console.log(error);

        res.json({
            success:false,
            message:"error occurred",
            Error:error
        })
        
        
    }

}
module.exports= {handleImageUpload}