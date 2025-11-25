const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:User,
    },
    address:String,
    pincode:String,
    city:String,
    notes:String
},{timestamps:true})

const Address = mongoose.model("Address",addressSchema)

module.exports = Address;