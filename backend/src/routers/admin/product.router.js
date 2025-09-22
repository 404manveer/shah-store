const express = require("express")
const { upload } = require("../../helpers/cloudinary")
const { handleImageUpload } = require("../../controllers/admin/product-controller")
const route = express.Router()



route.post("/upload-image",upload.single("MY_file"),handleImageUpload)
module.exports= route;