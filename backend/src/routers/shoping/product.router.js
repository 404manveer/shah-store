const express = require("express")
const { fetchshoppingProducts,fetchShoppingProductDetail } = require("../../controllers/shopping/product-controller")




const route = express.Router()




route.get("/get",fetchshoppingProducts)
route.get("/get/:productId",fetchShoppingProductDetail)

module.exports = route