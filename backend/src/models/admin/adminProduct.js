const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    saleprice:Number,
    stock:Number,
}) 


const productModel = mongoose.model("Products",productSchema);



module.exports = productModel;