const express = require('express');
const {  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItem,  } =require('../../controllers/shopping/cart-controller');

  const router = express.Router();


  router.post('/add',addToCart);
  router.get('/:userId',fetchCartItem);
  router.put('/update-quantity',updateCartItemQty);
    router.delete('/:productId/:userId/delete',deleteCartItem);

    module.exports = router;