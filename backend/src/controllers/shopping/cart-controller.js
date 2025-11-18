const Cart = require("../../models/cart.model");
const Product = require("../../models/admin/adminProduct");

// Add item to cart
const addToCart = async (req, res) => {  
  try {
    const { productId, userId, quantity } = req.body;
    
    if (!productId || !userId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    
    const product = await Product.findOne({ _id:productId});
   
    
    
    if (!product) {
      return res.status(
        (404).json({
          statuess: false,
          message: "product not found",
        })
      );
    }
    
    let cart = await Cart.findOne({userId});
    if(!cart){
      // create new cart 
      const newCart = new Cart({
        userId,
        items:[{productId,quantity}]
      })
      cart = newCart
      await cart.save();
    }else{
        //update existing cart
        const itemIndex = cart.items.findIndex(item=>item.productId==productId);
        if(itemIndex>-1){
            // item exists in cart, update quantity
            cart.items[itemIndex].quantity += quantity;
        }else{
            // item not in cart, add new item
            cart.items.push({productId,quantity});
        }
        await cart.save();
    }
    const populatedCart = await cart.findOne ({userId}).populate({ 

      path:'items.productId',
      select:'name price description image title', 
    }
    )    
    console.log(cart,'a populatedCart');
    console.log(cart,'a cart');
      

    return res.status(200).json({
        success:true,
        message:"item added to cart successfully",
        resposense:cart
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error occurred",
    });
  }
};

const updateCartItemQty = async (req, res) => {
  try {
     const { productId, userId, quantity } = req.body;
    if (!productId || !userId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const cart = await Cart.findOne({userId});
    if(!cart){
        return res.status(404).json({
            success:false,
            message:"cart not found"
        })
    }
    const itemIndex = cart.items.findIndex(item => item.productId.toString() == productId);
    if(itemIndex === -1){
        return res.status(404).json({
            success:false,
            message:"item not found in cart"
        })
    }
    cart.items[itemIndex].quantity += quantity;
    await cart.save();
    return res.status(200).json({
        success:true,
        message:"cart item quantity updated successfully",
        response:cart
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error occurred",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const {productId, userId} = req.params;
    if(!productId || !userId){
        return res.status(400).json({
            success:false,
            message:"missing required fields"
        })
    } 
    const cart = await Cart.findOne({userId});
    if(!cart){
        return res.status(404).json({
            success:false,
            message:"cart not found"
        })
    } 
    const itemIndex = cart.items.findIndex(item => item.productId == productId);
    if(itemIndex === -1){
        return res.status(404).json({
            success:false,
            message:"item not found in cart"
        })
    }
    cart.items.splice(itemIndex,1);
    await cart.save();
    return res.status(200).json({
        success:true,
        message:"item removed from cart successfully",
        response:cart
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error occurred",
    });
  }
};

const fetchCartItem = async (req, res) => {
  try {
    const {userId} = req.params;
    if(!userId){
        return res.status(400).json({
            success:false,
            message:"userId is required"
        })
    }

    const cart = await Cart.findOne({userId}).populate({
        path:'items.productId',
        select:'name price description image title',

    })
    if(!cart){
        return res.status(404).json({
            success:false,
            message:"cart not found"
        })
    }

    const validItems = cart.items.filter(item=>item.productId!=null);
    if(validItems.length!==cart.items.length)
    {
        cart.items = validItems;
        await cart.save();
    }
    const populatedCart = validItems.map(item=>({
        product:item.productId,
        quantity:item.quantity
    }));

    return res.status(200).json({
        success: true,
        message: "cart fetched successfully",
        response: populatedCart,
    })


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error occurred",
    });
  }
};

module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItem,
};