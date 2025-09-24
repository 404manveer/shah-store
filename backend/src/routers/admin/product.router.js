const express = require("express")
const { upload } = require("../../helpers/cloudinary")
const { handleImageUpload, createAdminProducts, fetchAdminProducts, updateAdminProducts, deleteAdminProducts } = require("../../controllers/admin/product-controller")
const route = express.Router()



route.post("/upload-image",upload.single("MY_file"),handleImageUpload)
route.post("/create",createAdminProducts)
route.get("/fetch",fetchAdminProducts)
route.put("/update/:id",updateAdminProducts)
route.delete("/delete/:id",deleteAdminProducts)
module.exports= route;