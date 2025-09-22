const cloudinary = require('cloudinary').v2
const multer = require('multer')


const storage = new multer.memoryStorage();
const upload = multer(storage)

async function imageUploadCloudinary(file){
try {
    cloudinary.config({
    cloud_name:"diazbejji",
    api_key:"842344329823317",
    api_secret:"zVm5dp0exODTQ2jkYjxI4XdH0G8"
})
const uploadimage = cloudinary.uploader.upload(file,{
    resource_type:'auto'
})
console.log(uploadimage);
return uploadimage
    
} catch (error) {
    console.log(error);
    
    
    
}


}

module.exports = {upload,imageUploadCloudinary}