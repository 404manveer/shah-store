
const { imageUploadCloudinary } = require('../../helpers/cloudinary');
const productModel = require('../../models/admin/adminProduct');




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

const createAdminProducts = async (req,res)=>{
    try {
        
        const {image,title,description,category,brand,price,saleprice,stock} = req.body;

        const createNewProduct = new productModel( {image,title,description,category,brand,price,saleprice,stock})
        await createNewProduct.save()
        res.status(200).json({
            success:true,
            message:"product is created succesfully",
            resposnse:createNewProduct
        })
        
    } catch (error) {
        console.log(error);
        res.status(201).json({
            success:false,
            message:"error occuied"
        })
        
        
    }
}
const fetchAdminProducts = async (req,res)=>{
    try {
        

        const productsList =  await productModel.find({})
       
        res.status(200).json({
            success:true,
            message:"product is fetch succesfully",
            resposnse:productsList
        })
        
    } catch (error) {
        console.log(error);
        res.status(201).json({
            success:false,
            message:"error occuied"
        })
        
        
    }
}
const updateAdminProducts = async (req,res)=>{
    try {
        
        const {image,title,description,category,brand,price,saleprice,stock} = req.body;
        const {id} =req.params;

        const updateProduct = await productModel.findById(id)
        if(!updateProduct) res.status(404).json({
            success:false,
            message:"product is not found"
        })

        updateProduct.title = title || updateProduct.title
        updateProduct.image = image || updateProduct.image
        updateProduct.description = description || updateProduct.description
        updateProduct.category = category || updateProduct.category
        updateProduct.brand = brand || updateProduct.brand
        updateProduct.price = price==0? "":price || updateProduct.price
        updateProduct.saleprice = saleprice==0?"":saleprice || updateProduct.saleprice
        updateProduct.stock = stock==0?"":stock || updateProduct.stock
        await updateProduct.save()
      
        res.status(200).json({
            success:true,
            message:"product is update succesfully",
            resposnse:updateProduct
        }) 
        
    } catch (error) {
        console.log(error);
        res.status(201).json({
            success:false,
            message:"error occuied"
        })
        
        
    }
}
const deleteAdminProducts = async (req,res)=>{
    try {
        
const {id} = req.params;
        const deleteProduct = await productModel.findOneAndDelete(id)
         if(!deleteProduct)res.status(404).json({
            success:false,
            message:"error occuied"
         }) 


        res.status(200).json({
            success:true,
            message:"product is deleted succesfully",
        })
        
    } catch (error) {
        console.log(error);
        res.status(201).json({
            success:false,
            message:"error occuied"
        })
        
        
    }
}






module.exports= {handleImageUpload,createAdminProducts,updateAdminProducts,fetchAdminProducts,deleteAdminProducts}