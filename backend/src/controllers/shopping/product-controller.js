const productModel = require("../../models/admin/adminProduct");




const fetchshoppingProducts = async(req,res)=>{
    try {

        const {category='',brand='',sortby="price-lowToHigh",} = req.query;
     console.log(category);
     
        
let filter={}

   if (category) {
  const categoryList = (Array.isArray(category)
    ? category
    : category.split(",").filter(Boolean)
  ).map(c => c.toLowerCase());

  filter.category = { $in: categoryList };
}

if (brand) {
  const brandList = (Array.isArray(brand)
    ? brand
    : brand.split(",").filter(Boolean)
  ).map(b => b.toLowerCase());

  filter.brand = { $in: brandList };
}


      if (brand) {
  const brandList = (Array.isArray(brand)
    ? brand
    : brand.split(",").filter(Boolean)
  ).map(b => b.toLowerCase());

  filter.brand = { $in: brandList };
}

      

        console.log(filter);

        let sort={}
        switch(sortby){
            case "price-lowToHigh":
                sort.price =1
                break

            case "price-highToLow":
                sort.price =-1
                break
            case "name-aToz":
                sort.title =1
                break
            case "name-zToa":
                sort.title =-1
                break
            default:
                sort.price=1    
                break;
        }
        

        const productsList =  await productModel.find(filter).sort(sort)
        // const productsList =  await productModel.find(filter).sort(sort)
       
        res.status(200).json({
            success:true,
            message:"product is fetch succesfully",
            response:productsList
        })
        
    } catch (error) {
        console.log(error);
      return  res.status(500).json({
            success:false,
            message:"error occucied"
        })
        
        
    }
}

const fetchShoppingProductDetail= async (req,res)=>{
    try {
        const {productId} = req.params;
        
        console.log(productId,'log of productid');
        if (!productId ) {
            return res.status(400).json({
    success: false,
    message: "Missing required query parameter: productId",
  });
}

        const product = await productModel.findById(productId)

        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
console.log(product);

        res.status(200).json({
            success:true,
            message:"Product found successfully!",
            response:product
        })
        
    } catch (error) {
         console.log(error);
      return  res.status(500).json({
            success:false,
            message:"error occucied"
        })
        
    }
}

module.exports ={fetchshoppingProducts,fetchShoppingProductDetail}